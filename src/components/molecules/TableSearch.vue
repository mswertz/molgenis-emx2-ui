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
    />
  </div>
</template>

<script>
import _graphqlTableMixin from "./_graphqlTableMixin";

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
<TableSearch schema="pet%20store" table="Pet"/>
```
</docs>