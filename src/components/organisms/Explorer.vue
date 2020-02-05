<template>
  <div>
    <MessageError v-if="error">{{ error }}</MessageError>
    <div v-else-if="table">
      <LayoutCard v-if="table && tableNames" :title="title">
        <template v-slot:header>
          <LayoutNavTabs
            v-if="tableNames"
            v-model="table"
            :items="tableNames"
            :defaultValue="table"
            label="Choose table: "
          />
        </template>
        <TableEdit :schema="schema" :table="table" />
      </LayoutCard>
      <br />
    </div>
  </div>
</template>

<script>
import MessageError from '../elements/MessageError.vue'
import LayoutNavTabs from '../elements/LayoutNavTabs.vue'
import TableEdit from '../molecules/TableEdit.vue'
import LayoutCard from '../elements/LayoutCard.vue'

import { request } from 'graphql-request'

/** For viewing data in the tables of one schema  */
export default {
  data: function () {
    return {
      table: null,
      tableNames: null,
      error: null,
      key: 0
    }
  },
  props: {
    schema: String
  },
  components: {
    MessageError,
    LayoutNavTabs,
    TableEdit,
    LayoutCard
  },
  methods: {
    refresh () {
      this.error = null
      this.key = this.key + 1
    },
    load () {
      this.tableNames = null
      this.error = null
      request(this.endpoint, '{_meta{tables{name}}}')
        .then(data => {
          this.tableNames = []
          data._meta.tables.forEach(element => {
            this.tableNames.push(element.name)
            if (this.table === null) {
              this.table = this.tableNames[0] // default
            }
          })
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.error =
              "Schema doesn't exist or permission denied. Do you need to Sign In?"
          } else {
            this.error = error
          }
        })
    }
  },
  created () {
    this.load()
  },
  computed: {
    endpoint () {
      return '/api/graphql/' + this.schema
    },
    title () {
      return 'Table: ' + this.table
    },
    account () {
      return this.$store.state.account.email
    }
  },
  watch: {
    username () {
      this.load()
    },
    account () {
      this.load()
      this.refresh()
    }
  }
}
</script>

<docs>
Example
```
<Explorer schema="pet%20store"/>
```
</docs>
