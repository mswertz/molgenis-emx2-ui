<template>
  <div class="card">
    <div v-if="title" class="card-header text-center">
      <h4>{{title}}</h4>
    </div>
    <div class="card-body">
      <!-- @slot Use this slot to place the card content -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** Title that is shown on the card */
    title: String
  }
};
</script>

<docs>

### Examples

```jsx
<Card title="My first card">
  Hello world
  <ButtonPrimary>Hello</ButtonPrimary>
</Card>
```

</docs>