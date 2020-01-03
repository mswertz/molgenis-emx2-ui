<template>
  <a v-if="href" type="button" class="btn btn-link" :href="href">
    <!-- @slot label that is shown on the button -->
    <slot />
  </a>
  <button v-else type="button" class="btn btn-link" @click="onClick">
    <slot />
  </button>
</template>

<script>
/** Button that is shown as a link */
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
<ButtonLink href="http://google.com">Hello hyperlink</ButtonLink>
```

With action

```jsx
<ButtonLink v-on:click="action('hello')">Hello action</ButtonLink>
```

</docs>