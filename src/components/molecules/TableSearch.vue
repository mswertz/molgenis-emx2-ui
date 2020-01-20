<template>
  <div>
    <MessageError v-if="error">{{error}}</MessageError>
    <InputSearch v-if="table" v-model="searchTerms" />
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <DataTable
      v-else
      :metadata="metadata"
      :data="data"
      :selectColumn="selectColumn"
      :selectedItems="selectedItems"
      @select="select"
      @deselect="deselect"
    >
      <template v-slot:root="slotProps">
        <slot name="root" />
      </template>
      <template v-slot:rowheader="slotProps">
        <slot name="rowheader" :row="slotProps.row" :metadata="slotProps.metadata" />
      </template>
    </DataTable>
  </div>
</template>

<script>
import _graphqlTableMixin from "../elements/_graphqlTableMixin";

export default {
  extends: _graphqlTableMixin,
  props: {
    selectColumn: String,
    selectedItems: Array
  },
  methods: {
    select(value) {
      this.$emit("select", value);
    },
    deselect(value) {
      this.$emit("deselect", value);
    }
  }
};
</script>

<docs>
Example:
```
<TableSearch schema="pet%20store" table="Pet">
<template v-slot:rowheader="props">my row action {{props.row.name}}</template>
</TableSearch>
```
</docs>