<template >
  <div>
    <InputString v-if="columnType ==='STRING'" v-bind="$props" v-model="value" />
    <InputInt v-else-if="columnType ==='INT'" v-bind="$props" v-model="value" />
    <InputDecimal v-else-if="columnType ==='DECIMAL'" v-bind="$props" v-model="value" />
    <InputBoolean v-else-if="columnType ==='BOOL'" v-bind="$props" v-model="value" />
    <InputRef v-else-if="columnType ==='REF'" v-bind="$props" v-model="value" />
    <InputDate v-else-if="columnType ==='DATE'" v-bind="$props" v-model="value" />
    <InputDateTime v-else-if="columnType ==='DATETIME'" v-bind="$props" v-model="value" />
    <InputRefArray
      v-else-if="columnType ==='REF_ARRAY' || columnType ==='REFBACK'"
      v-bind="$props"
      v-model="value"
    />
    <InputString v-else-if="columnType ==='STRING_ARRAY'" v-bind="$props" v-model="value" />
    <div v-else>UNSUPPORTED TYPE {{columnType}}</div>
  </div>
</template>

<script>
import _baseInput from "../elements/_baseInput";
import InputString from "../elements/InputString";
import InputInt from "../elements/InputInt";
import InputDecimal from "../elements/InputDecimal";
import InputBoolean from "../elements/InputBoolean";
import InputRef from "./InputRef";
import InputDate from "../elements/InputDate";
import InputDateTime from "../elements/InputDateTime";
import InputRefArray from "./InputRefArray";

export default {
  extends: _baseInput,
  props: {
    schema: String,
    columnType: String,
    refTable: String,
    refColumn: String,
    defaultValue: String
  },
  components: {
    InputString,
    InputInt,
    InputDecimal,
    InputBoolean,
    InputRef,
    InputDate,
    InputDateTime,
    InputRefArray
  }
};
</script>

<docs>
Example:
```
<RowColumnInput columnType="STRING" label="Test String"/>
<RowColumnInput columnType="REF" label="Test ref" schema="pet store" refTable="Pet" refColumn="name"/>
<RowColumnInput columnType="DATE" label="Test Date"/>

```
</docs>