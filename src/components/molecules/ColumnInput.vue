<template >
  <InputString v-if="columnType ==='STRING'" v-bind="$props" v-model="value" />
  <InputString v-else-if="columnType ==='INT'" v-bind="$props" v-model="value" />
  <div v-else>UNSUPPORTED TYPE {{label}} {{isString}}</div>
</template>

<script>
import _baseInput from "../elements/_baseInput";

export default {
  extends: _baseInput,
  props: {
    columnType: String
  }
};
</script>

<docs>
Example:
```
<ColumnInput columnType="STRING" label="Test String"/>

<ColumnInput columnType="DATE" label="Test Error"/>

```
</docs>