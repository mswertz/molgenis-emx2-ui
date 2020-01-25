<template>
  <div>
    <MessageError v-if="error">{{ error }}</MessageError>
    <InputSearch v-if="table" v-model="searchTerms" />
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <DataTable
      v-else
      v-model="selectedItems"
      :columns="columns"
      :rows="rows"
      :selectColumn="selectColumn"
      :defaultValue="defaultValue"
      @select="select"
      @deselect="deselect"
    >
      <template v-slot:colheader="slotProps">
        <slot name="colheader" />
      </template>
      <template v-slot:rowheader="slotProps">
        <slot name="rowheader" :row="slotProps.row" :metadata="metadata" />
      </template>
    </DataTable>
    <!--
    Data:
    {{ data }}
    <br />
    Rows: {{ rows }}-->
  </div>
</template>

<script>
import _graphqlTableMixin from "./_graphqlTableMixin";

import DataTable from "../elements/DataTable";
import MessageError from "../elements/MessageError";
import InputSearch from "../elements/InputSearch";

export default {
  extends: _graphqlTableMixin,
  props: {
    defaultValue: [],
    selectColumn: String
  },
  components: {
    DataTable,
    MessageError,
    InputSearch
  },
  data: function() {
    return { selectedItems: [] };
  },
  methods: {
    select(value) {
      this.$emit("select", value);
    },
    deselect(value) {
      this.$emit("deselect", value);
    }
  },
  watch: {
    selectedItems() {
      this.$emit("input", this.selectedItems);
    }
  },
  computed: {
    columns() {
      if (this.metadata && this.metadata.columns) {
        return this.metadata.columns.map(col => col.name);
      }
      return null;
    },
    rows() {
      if (this.data != null) {
        return this.data.map(row => {
          let result = { ...row };
          this.metadata.columns.forEach(col => {
            if (row[col.name]) {
              if ("REF" === col.columnType) {
                result[col.name] = row[col.name][col.refColumn];
              } else if (
                "REF_ARRAY" === col.columnType ||
                "REFBACK" === col.columnType
              ) {
                result[col.name] = row[col.name].map(val => val[col.refColumn]);
              }
            }
          });
          return result;
        });
      }
      return this.data;
    }
  }
};
</script>

<docs>
Example:
```
<TableSearch schema="pet%20store" table="Pet" pkey="name">
<template v-model="selectedItems" v-slot:rowheader="props">my row action {{props.row.name}}</template>
</TableSearch>

```
Example with select and default value
```
<template>
<div>
<TableSearch v-model="selectedItems" schema="pet%20store" table="Pet" pkey="name" selectColumn="name" defaultValue="pooky">
<template v-slot:rowheader="props">my row action {{props.row.name}}</template>
</TableSearch>
Selected: {{selectedItems}} 
</div>

</template>

<script>
export default {
  data: function() {
    return {
      selectedItems:[]
    };
  }
}
</script>
```
</docs>
