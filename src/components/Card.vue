<template>
  <div class="card">
    <div v-if="title" class="card-header text-center">
      <h4>{{title}}</h4>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>