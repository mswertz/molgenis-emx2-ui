<template>
  <div>nothing</div>
</template>

<script>
import { request } from "graphql-request";
import _graphqlTableMetadataMixin from "./_graphqlTableMetadataMixin";

export default {
  mixins: [_graphqlTableMetadataMixin],
  data: function() {
    return {
      data: [],
      searchTerms: null
    };
  },
  methods: {
    reload() {
      this.loading = true;
      request(this.endpoint, this.graphql)
        .then(data => {
          this.error = null;
          this.data = data[this.table]["data"];
        })
        .catch(error => (this.error = "internal server error" + error));
      this.loading = false;
    }
  },
  computed: {
    graphql() {
      let search =
        this.searchTerms != null && this.searchTerms != ""
          ? '(search:"' + this.searchTerms + '")'
          : "";
      return "{" + this.table + search + "{data{" + this.columnNames + "}}}";
    },
    columnNames() {
      let result = "";
      this.metadata.columns.forEach(element => {
        if (["REF", "REF_ARRAY", "REFBACK"].includes(element.columnType)) {
          result = result + " " + element.name + "{" + element.refColumn + "}";
        } else {
          result = result + " " + element.name;
        }
      });
      return result;
    }
  },
  watch: {
    searchTerms: "reload",
    metadata: "reload"
  }
};
</script>