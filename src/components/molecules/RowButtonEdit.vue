<template>
  <div>
    <LayoutModal v-if="open" :title="title" @close="closeForm">
      <RowForm :schema="schema" :table="table" :pkey="pkey" @close="closeForm" />
    </LayoutModal>
    <IconAction icon="edit" @click="openForm" />
  </div>
</template>

<script>
//extends
import RowButtonAdd from "./RowButtonAdd";
//uses
import RowForm from "./RowForm.vue";
import LayoutModal from "../elements/LayoutModal";
import IconAction from "../elements/IconAction";

export default {
  extends: RowButtonAdd,
  components: {
    RowForm,
    LayoutModal,
    IconAction
  },
  props: {
    pkey: String
  },
  computed: {
    title() {
      return `Update ${this.table}`;
    }
  }
};
</script>

<docs>Example

```
<RowButtonEdit schema="pet store" table="Pet" pkey="spike" />
```
</docs>