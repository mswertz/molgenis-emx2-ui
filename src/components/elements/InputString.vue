<template>
  <form-group v-bind="$props">
    <input
      class="form-control"
      :id="id"
      :aria-describedby="id + 'Help'"
      :placeholder="placeholder"
      v-model="value"
    />
  </form-group>
</template>

<script>
import AbstractInput from "./_formGroup.vue";

/** Input for passwords */
export default {
  extends: AbstractInput,
  data() {
    return {
      value: null
    };
  },
  components: {
    "form-group": AbstractInput
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>

<docs>
### Examples

```
<template>
  <div>
    <InputString v-model="value" label="My string input label" help="Some help needed?" />
    <br />
    You typed: {{value}}
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      value: null
    };
  }
};
</script>
```
</docs>