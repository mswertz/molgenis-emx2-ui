<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div v-else>
    <MessageError v-if="error">{{error}}</MessageError>
    <InputSearch v-if="table" v-model="searchTerms" />
    <DataTable
      :metadata="metadata"
      :data="data"
      :selectable="selectable"
      :selectedItems="selectedItems"
      @select="select"
      @deselect="deselect"
    />
  </div>
</template>

<script>
import _graphqlTableMixin from "./_graphqlTableMixin";

export default {
  extends: _graphqlTable,
  props: {
    selectable: {
      String,
      default: false
    },
    selectedItems: Array
  },
  methods: {
    select(pkey) {
      this.$emit("select", pkey);
    },
    deselect(pkey) {
      this.$emit("deselect", pkey);
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