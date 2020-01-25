<template>
  <div>
    <MessageError v-if="error">{{ error }}</MessageError>
    <DataTable :columns="['user', 'role']" :rows="members">
      <template v-slot:colheader="slotProps"
        ><IconAction icon="plus"
      /></template>
      <template v-slot:rowheader="slotProps"
        ><IconBar
          ><IconAction icon="edit" /><IconDanger icon="trash" /> </IconBar
      ></template>
    </DataTable>

    endpoint: '{{ endpoint }}' members: {{ JSON.stringify(members) }}
  </div>
</template>

<script>
import { request } from "graphql-request";

import MessageError from "../elements/MessageError";
import IconAction from "../elements/IconAction";
import IconDanger from "../elements/IconDanger";
import DataTable from "../elements/DataTable";
import IconBar from "../elements/IconBar";

export default {
  data: function() {
    return {
      members: null,
      error: null
    };
  },
  components: {
    MessageError,
    IconAction,
    IconDanger,
    DataTable,
    IconBar
  },
  props: {
    schema: String
  },
  methods: {
    loadMembers() {
      request(this.endpoint, `{_meta{members{user,role}}}`)
        .then(data => {
          this.members = data._meta.members;
        })
        .catch(error => (this.error = error.response.error));
    }
  },
  computed: {
    endpoint() {
      return "/api/graphql/" + this.schema;
    }
  },
  created() {
    this.loadMembers();
  }
};
</script>

<docs>
```
<Members schema="pet store"/>
```
</docs>
