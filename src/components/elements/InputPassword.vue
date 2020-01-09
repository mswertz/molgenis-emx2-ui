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
import _formGroup from "./_formGroup.vue";

/** Input for passwords */
export default {
  extends: _formGroup,
  data: function() {
    return {
      value: null
    };
  },
  components: {
    "form-group": _formGroup
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>

<docs>
Examlple
```
<template>
  <div>
    <Form>
      <InputPassword
        v-model="value"
        label="My password label"
        placholder="type here your password"
        help="Some help needed?"
      />
    </Form>
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