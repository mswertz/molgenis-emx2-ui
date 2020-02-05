<template>
  <div>
    <!-- todo: change to generic RowForm for this if we make settings table fields behave as normal tables?-->
    <div v-if="view === 'list'">
      <MessageError v-if="error">{{ error }}</MessageError>
      <DataTable v-else :columns="['user', 'role']" :rows="members">
        <template v-slot:colheader="slotProps">
          <IconAction icon="plus" @click="showAdd" />
        </template>
        <template v-slot:rowheader="slotProps">
          <IconBar>
            <IconAction icon="edit" @click="showEdit(slotProps.row)" />
          </IconBar>
        </template>
      </DataTable>
      endpoint: '{{ endpoint }}' members: {{ JSON.stringify(members) }}
    </div>
    <LayoutModal
      v-else-if="view === 'add'"
      title="add member"
      @close="view = 'list'"
    >
      <template v-slot:body>
        <InputString label="Email address" />
        <InputSelect label="Role" items="Manager,Editor,Viewer" />
      </template>
      <template v-slot:footer>
        <ButtonAlt @click="view = 'list'">Cancel</ButtonAlt>
        <ButtonAction>Add member</ButtonAction>
      </template>
    </LayoutModal>
    <LayoutModal v-else-if="view === 'edit'" title="Update member">
      <template v-slot:body>
        <InputString
          label="Email address"
          readonly
          v-model="currentMember.user"
          :defaultValue="currentMember.user"
        />
        <InputSelect
          label="Role"
          v-model="currentMember.role"
          :defaultValue="currentMember.role"
          :items="roles"
        />
      </template>
      <template v-slot:footer>
        <ButtonAlt @click="view = 'list'">Cancel</ButtonAlt>
        <ButtonAction>Update member</ButtonAction>
        <ButtonDanger>Delete member</ButtonDanger>
      </template>
    </LayoutModal>
  </div>
</template>

<script>
import { request } from 'graphql-request'

import MessageError from '../elements/MessageError'
import IconAction from '../elements/IconAction'
import DataTable from '../elements/DataTable'
import IconBar from '../elements/IconBar'
import ButtonAction from '../elements/ButtonAction'
import ButtonAlt from '../elements/ButtonAlt'
import ButtonDanger from '../elements/ButtonDanger'
import LayoutModal from '../elements/LayoutModal'
import InputString from '../elements/InputString'
import InputSelect from '../elements/InputSelect'

export default {
  data: function () {
    return {
      view: 'list',
      currentMember: {},
      roles: ['Owner', 'Manager', 'Editor', 'Viewer'],
      members: null,
      error: null
    }
  },
  components: {
    MessageError,
    IconAction,
    ButtonAction,
    ButtonAlt,
    ButtonDanger,
    DataTable,
    IconBar,
    LayoutModal,
    InputSelect,
    InputString
  },
  props: {
    schema: String
  },
  methods: {
    showAdd () {
      this.view = 'add'
    },
    showEdit (row) {
      this.currentMember = row
      this.view = 'edit'
    },
    loadMembers () {
      this.error = false
      this.members = []
      request(this.endpoint, `{_meta{members{user,role}}}`)
        .then(data => {
          this.members = data._meta.members
        })
        .catch(error => (this.error = error.response.error))
    }
  },
  computed: {
    endpoint () {
      return '/api/graphql/' + this.schema
    },
    account () {
      return this.$store.state.account.email
    }
  },
  created () {
    this.loadMembers()
  },
  watch: {
    account () {
      this.loadMembers()
    }
  }
}
</script>

<docs>
```
<Members schema="pet store"/>
```
</docs>
