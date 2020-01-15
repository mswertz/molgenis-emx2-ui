<template >
  <InputString v-if="columnType ==='STRING'" v-bind="$props" v-model="value" />
  <InputString v-else-if="columnType ==='INT'" v-bind="$props" v-model="value" />
  <InputRef v-else-if="columnType ==='REF'" v-bind="$props" v-model="value" />
  <InputRefArray v-else-if="columnType ==='REF_ARRAY'" v-bind="$props" v-model="value" />
  <div v-else>UNSUPPORTED TYPE {{columnType}}</div>
</template>

<script>
import _baseInput from "../elements/_baseInput";

export default {
  extends: _baseInput,
  props: {
    columnType: String,
    schema: String,
    refTable: String,
    refColumn: String
  }
};
</script>

<docs>
Example:
```
<InputColumn columnType="STRING" label="Test String"/>

<InputColumn columnType="REF" label="Test ref" schema="pet store" refTable="Pet" refColumn="name" value12="spike"/>

<InputColumn columnType="DATE" label="Test Date"/>



```
</docs>