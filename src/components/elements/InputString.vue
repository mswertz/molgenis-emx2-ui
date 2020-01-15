<template>
  <form-group v-bind="$props">
    <input
      :class="{'form-control':true, 'is-invalid':error}"
      :id="id"
      :aria-describedby="id + 'Help'"
      :placeholder="placeholder"
      v-model="value"
      @keypress="keyhandler"
    />
  </form-group>
</template>

<script>
import _baseInput from "./_baseInput.vue";

export default {
  extends: _baseInput,
  methods: {
    keyhandler(event) {
      return event;
    }
  }
};
</script>

<docs>
Example
```
<template>
  <div>
    <LayoutForm>
      <InputString v-model="value" label="My string input label" help="Some help needed?" />
    </LayoutForm>
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