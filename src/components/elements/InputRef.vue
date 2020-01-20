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
        :selectColumn="refColumn"
        :selectedItems="value"
        @select="select"
        @deselect="deselect"
      />
    </LayoutModal>
    {{selectedItems}}
  </form-group>
</template>

<script>
import _baseInput from "./_baseInput";
import _graphqlTableMixin from "./_graphqlTableMixin";

export default {
  extends: _baseInput,
  mixins: [_graphqlTableMixin],
  data: function() {
    return {
      showSelect: false
    };
  },
  props: {
    refTable: String,
    refColumn: String
  },
  computed: {
    title() {
      return "Select " + this.table;
    },
    table() {
      return this.refTable;
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
<InputRef schema="pet store" refTable="Pet" refColumn="name"  />
```
Example with default value
```
<template>
  <div>
    <InputRef
      v-model="check"
      schema="pet store"
      refTable="Pet"
      refColumn="name"
      defaultValue="spike"
    />
    {{check}}
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      check: null
    };
  },
  methods: {
    clear() {
      this.check = null;
    }
  }
};
```
</docs>
