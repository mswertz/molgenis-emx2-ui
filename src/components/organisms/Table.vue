<template>
  <div class="table-responsive">
    <MessageError v-if="error">{{error}}</MessageError>
    <InputSelect v-model="table" :items="tableNames" placeholder="Select table..." />
    <InputSearch v-if="table" v-model="searchTerms"/>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="column in tables[table]" :key="column.name" scope="col">{{column.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,index) in data" :key="index">
          <td v-for="column in tables[table]" :key="column.name">
            <ul class="list-unstyled" v-if="['REF_ARRAY', 'REFBACK'].includes(column.columnType)">
              <li v-for="item in row[column.name]" :key="item">{{item[column.refColumnName]}}</li>
            </ul>
            <span v-else-if="'REF' === column.columnType">{{row[column.name][column.refColumnName]}}</span>
            <span v-else-if="column.columnType.includes('_ARRAY')"></span>
            <span v-else>{{row[column.name]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
        <br />
    searchTerms:
    {{searchTerms}}
    <br />metadata:
    <pre>{{JSON.stringify(tables,null,2)}}</pre>
    <br />
    table selected: {{table}}
    <br />
    column selection: {{columnNames}}
    <br />
    graphql:
    {{graphql}}
    <br />
    data:
    {{data}}
  </div>
</template>

<script>
import MessageError from "../elements/MessageError.vue";
import InputSelect from "../elements/InputSelect.vue";
import InputSearch from "../elements/InputSearch.vue";

import { request } from "graphql-request";

export default {
  data: function() {
    return {
      table: null,
      tables: {},
      searchTerms: null,
      data: [],
      error: null
    };
  },
  props: {
    schema: String
  },
  components: {
    MessageError,
    InputSearch,InputSelect
  },
  methods: {
    reload() {
      request(this.endpoint, this.graphql)
        .then(data => {
          this.error = null;
          this.data = data[this.table]["data"];
        })
        .catch(error => (this.error = "internal server error" + error));
    }
  },
  created() {
    request(
      this.endpoint,
      "{_meta{tables{name,columns{name,columnType,refColumnName}}}}"
    )
      .then(data => {
        this.tables = {};
        data._meta.tables.forEach(element => {
          this.tables[element.name] = element.columns;
        });
      })
      .catch(error => (this.error = "internal server error" + error));
  },
  computed: {
    graphql() {
      let search = this.searchTerms != null && this.searchTerms != ''? '(search:"'+this.searchTerms+'")' : '';
      return "{" + this.table + search + "{data{" + this.columnNames + "}}}";
    },
    endpoint() {
      return "/api/graphql/" + this.schema;
    },
    tableNames() {
      return Object.keys(this.tables);
    },
    columnNames() {
      let result = "";
      if (this.tables[this.table] != null) {
        this.tables[this.table].forEach(element => {
          if (["REF", "REF_ARRAY", "REFBACK"].includes(element.columnType)) {
            result =
              result + " " + element.name + "{" + element.refColumnName + "}";
          } else {
            result = result + " " + element.name;
          }
        });
      }
      return result;
    }
  },
  watch: {
    table: "reload",
    searchTerms:"reload"
  }
};
</script>

<docs>
Example
```
<Table schema="pet%20store" table="Pet"/>
```
</docs>