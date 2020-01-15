<template>
  <div class="table-responsive">
    <MessageError v-if="error">{{error}}</MessageError>
    <NavTabs v-model="table" :items="tableNames" :value="table" label="Choose table: " />
    <LayoutCard v-if="table" :title="title">
      <TableSearch :schema="schema" :table="table" />
    </LayoutCard>
    <br />
  </div>
</template>

<script>
import MessageError from "../elements/MessageError.vue";
import NavTabs from "../elements/NavTabs.vue";
import TableSearch from "../molecules/TableSearch.vue";
import LayoutCard from "../elements/LayoutCard.vue";

import { request } from "graphql-request";

export default {
  data: function() {
    return {
      table: null,
      tableNames: [],
      error: null
    };
  },
  props: {
    schema: String
  },
  components: {
    MessageError,
    NavTabs,
    TableSearch,
    LayoutCard
  },
  created() {
    request(this.endpoint, "{_meta{tables{name}}}")
      .then(data => {
        this.tableNames = [];
        data._meta.tables.forEach(element => {
          this.tableNames.push(element.name);
          this.table = this.tableNames[0]; //default
        });
      })
      .catch(error => (this.error = "internal server error" + error));
  },
  computed: {
    endpoint() {
      return "/api/graphql/" + this.schema;
    },
    title() {
      return "Table: " + this.table;
    }
  }
};
</script>

<docs>
Example
```
<MiniExplorer schema="pet%20store"/>
```
</docs>