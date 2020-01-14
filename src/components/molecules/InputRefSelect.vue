<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <form-group v-else v-bind="$props">
    <select class="custom-select" :id="id" @click="openSelect">
      <option v-if="value && !showSelect" :value="value" selected>{{value}}</option>
    </select>
    <LayoutModal :title="title" @close="closeSelect" :show="showSelect">
      <MessageError v-if="error">{{error}}</MessageError>
      <InputSearch v-if="table" v-model="searchTerms" />
      <DataTable
        :metadata="metadata"
        :data="data"
        :selectable="true"
        :selectedItems="value"
        @select="select"
        @deselect="deselect"
      />
    </LayoutModal>
  </form-group>
</template>

<script>
import _baseInput from "../elements/_baseInput";
import _graphqlTableMixin from "./_graphqlTableMixin";

export default {
  extends: _baseInput,
  mixins: [_graphqlTableMixin],
  data: function() {
    return {
      showSelect: false
    };
  },
  computed: {
    title() {
      return "Select " + this.table;
    }
  },
  methods: {
    select(value) {
      this.showSelect = false;
      this.value = value;
    },
    closeSelect() {
      this.showSelect = false;
    },
    openSelect() {
      this.showSelect = true;
    }
  }
};
</script>

<docs>
Example
```
<InputRefSelect schema="pet store" table="Pet"  />
```
</docs>