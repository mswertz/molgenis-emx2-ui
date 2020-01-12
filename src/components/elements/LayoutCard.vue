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
    /** Title that is shown on the card (optional) */
    title: String
  }
};
</script>

<docs>

Example 

```jsx
<LayoutCard title="My first card">
  Hello world
  <ButtonAction>Hello</ButtonAction>
</LayoutCard>
```

</docs>