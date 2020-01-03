<template>
  <a v-if="href" type="button" class="btn btn-primary" :href="href">
    <!-- @slot label that is shown on the button -->
    <slot />
  </a>
  <button v-else type="button" class="btn btn-primary" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    /** hyperlink that is followed when clicked */
    href: String
  },
  methods: {
    onClick() {
      /** emitted on click */
      this.$emit("click");
    }
  }
};
</script>

<docs>
### Examples

With hyperlink

```jsx
<ButtonPrimary href="http://google.com">Hello hyperlink</ButtonPrimary>
```

With action

```jsx
<ButtonPrimary v-on:click="action('hello')">Hello action</ButtonPrimary>
```

</docs>