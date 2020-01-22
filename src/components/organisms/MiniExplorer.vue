<template>
  <div>
    <MessageError v-if="error">{{ error }}</MessageError>
    <div class="table-responsive" v-if="table">
      <LayoutNavTabs
        v-if="tableNames"
        v-model="table"
        :items="tableNames"
        :defaultValue="table"
        label="Choose table: "
      />
      <LayoutCard v-if="table && tableNames" :title="title">
        <TableSearch :schema="schema" :table="table" :key="key">
          <template v-slot:root>
            <RowButtonAdd :schema="schema" :table="table" @close="refresh" />
          </template>
          <template v-slot:rowheader="slotProps">
            <div style="display: flex">
              <RowButtonEdit
                :schema="schema"
                :table="table"
                :pkey="slotProps.row[slotProps.metadata.pkey]"
                @close="refresh"
              />
              <RowButtonDelete
                :schema="schema"
                :table="table"
                :pkey="slotProps.row[slotProps.metadata.pkey]"
                @close="refresh"
              />
            </div>
          </template>
        </TableSearch>
      </LayoutCard>
      <br />
    </div>
  </div>
</template>

<script>
import MessageError from "../elements/MessageError.vue";
import LayoutNavTabs from "../elements/LayoutNavTabs.vue";
import TableSearch from "../molecules/TableSearch.vue";
import LayoutCard from "../elements/LayoutCard.vue";

import { request } from "graphql-request";

export default {
  data: function() {
    return {
      table: null,
      tableNames: null,
      error: null,
      key: 0
    };
  },
  props: {
    schema: String
  },
  components: {
    MessageError,
    LayoutNavTabs,
    TableSearch,
    LayoutCard
  },
  methods: {
    refresh() {
      this.key = this.key + 1;
    },
    load() {
      this.tableNames = null;
      this.error = null;
      request(this.endpoint, "{_meta{tables{name}}}")
        .then(data => {
          this.tableNames = [];
          data._meta.tables.forEach(element => {
            this.tableNames.push(element.name);
            if (this.table === null) {
              this.table = this.tableNames[0]; //default
            }
          });
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.error =
              "Schema doesn't exist or permission denied. Do you need to Sign In?";
          } else {
            this.error = error;
          }
        });
    }
  },
  created() {
    this.load();
  },
  computed: {
    endpoint() {
      return "/api/graphql/" + this.schema;
    },
    title() {
      return "Table: " + this.table;
    },
    username() {
      return this.$store.state.login.username;
    }
  },
  watch: {
    username() {
      this.load();
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
