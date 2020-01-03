<template>
  <form-group v-bind="$props">
    <input
      class="form-control"
      type="password"
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
  data: function() {
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
    <InputPassword
      v-model="value"
      label="My password label"
      placholder="type here your password"
      help="Some help needed?"
    />
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