<template>
  <div>
    <LayoutModal v-if="open" :title="title" @close="closeForm">
      <RowForm :schema="schema" :table="table" @close="closeForm" />
    </LayoutModal>
    <IconAction icon="plus" @click="openForm" />
  </div>
</template>

<script>
import RowForm from "./RowForm.vue";
import IconAction from "../elements/IconAction";

export default {
  data: function() {
    return {
      open: false
    };
  },
  components: {
    RowForm,
    IconAction
  },
  props: {
    schema: String,
    table: String
  },
  computed: {
    title() {
      return "Add new row to table " + this.table;
    }
  },
  methods: {
    openForm() {
      this.open = true;
    },
    closeForm() {
      this.open = false;
      this.$emit("close");
    }
  }
};
</script>

<docs>Example

```
<RowButtonAdd schema="pet store" table="Pet" />
```
</docs>