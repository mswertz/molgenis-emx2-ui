<template>
  <button type="button" class="btn btn-link" @click="onClick">Cancel</button>
</template>

<script>
/** Cancel button */
export default {
  methods: {
    onClick() {
      /** emitted on click */
      this.$emit("click");
    }
  }
};
</script>

<docs>
Example

```jsx
<ButtonCancel v-on:click="action('cancel')"/>
```

</docs>