<template>
  <div>nothing</div>
</template>

<script>
import { request } from "graphql-request";

export default {
  props: {
    schema: String,
    table: String
  },
  data: function() {
    return {
      data: [],
      metadata: {},
      loading: true,
      error: null,
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
    },
    reloadMetadata() {
      this.loading = true;
      request(
        this.endpoint,
        //todo: impleent filtering on metadata so we can only retrieve this table metadata
        "{_meta{tables{name,pkey,columns{name,columnType,refColumn}}}}"
      )
        .then(data => {
          data._meta.tables.forEach(element => {
            if (element.name === this.table) {
              this.metadata = element;
            }
          });
        })
        .catch(error => (this.error = "internal server error" + error));
    }
  },
  computed: {
    endpoint() {
      return "/api/graphql/" + this.schema;
    },
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
    schema: "reloadMetadata",
    table: "reloadMetadata",
    searchTerms: "reload",
    metadata: "reload"
  },
  created() {
    this.reloadMetadata();
  }
};
</script>