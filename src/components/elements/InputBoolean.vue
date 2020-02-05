<template>
  <InputRadio :items="[true,false]" v-bind="$props" v-model="value" />
</template>

<script>
import _baseInput from './_baseInput'
import InputRadio from './InputRadio'
export default {
  extends: _baseInput,
  components: { InputRadio }
}
</script>

<docs>
Example with defaultValue
```
<InputBoolean label="My first boolean" help="do you need some boolean help?"/>
```
</docs>
