<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <form-group v-else v-bind="$props">
    <select class="custom-select" :id="id" @click="openSelect" multiple>
      <option v-for="item in value" :key="item" :value="item" selected>{{item}}</option>
    </select>
    <LayoutModal :title="title" @close="closeSelect" :show="showSelect">
      <div v-if="showSelect">
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
      </div>
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
      if (this.value == null) this.value = [];
      this.value.push(value);
    },
    deselect(value) {
      this.value = this.value.filter(item => item !== value);
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
<InputRefArraySelect schema="pet store" table="Pet"  />
```
</docs>