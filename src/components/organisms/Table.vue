<template>
  <div class="table-responsive">
    <MessageError v-if="error">{{error}}</MessageError>
    <InputSelect v-model="table" :items="tableNames" placeholder="Select table..." />
    <TableSearch :schema="schema" :table="table" />
    <br />
    table selected: {{table}}
  </div>
</template>

<script>
import MessageError from "../elements/MessageError.vue";
import InputSelect from "../elements/InputSelect.vue";
import TableSearch from "../molecules/TableSearch.vue";

import { request } from "graphql-request";

export default {
  data: function() {
    return {
      table: null,
      tables: {},
      error: null
    };
  },
  props: {
    schema: String
  },
  components: {
    MessageError,
    InputSelect,
    TableSearch
  },
  created() {
    request(
      this.endpoint,
      "{_meta{tables{name,pkey,columns{name,columnType,refColumnName}}}}"
    )
      .then(data => {
        this.tables = {};
        data._meta.tables.forEach(element => {
          this.tables[element.name] = element;
        });
      })
      .catch(error => (this.error = "internal server error" + error));
  },
  computed: {
    endpoint() {
      return "/api/graphql/" + this.schema;
    },
    tableNames() {
      return Object.keys(this.tables);
    }
  }
};
</script>

<docs>
Example
```
<Table schema="pet%20store" table="Pet"/>
```
</docs>