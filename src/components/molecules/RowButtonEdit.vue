<template>
  <div>
    <RowEditModal
      v-if="open"
      :schema="schema"
      :table="table"
      :pkey="pkey"
      @close="closeForm"
    />
    <IconAction v-else icon="edit" @click="openForm" />
  </div>
</template>

<script>
import RowButtonAdd from './RowButtonAdd'
import RowEditModal from './RowEditModal.vue'
import IconAction from '../elements/IconAction'

export default {
  extends: RowButtonAdd,
  components: {
    RowEditModal,
    IconAction
  },
  props: {
    pkey: String
  },
  computed: {
    title () {
      return `Update ${this.table}`
    }
  }
}
</script>

<docs>Example

```
<RowButtonEdit schema="pet store" table="Pet" pkey="spike" />
```
</docs>
