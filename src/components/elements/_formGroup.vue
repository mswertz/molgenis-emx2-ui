/** internal component that will not be shown in style guide */

<template>
  <div class="form-group">
    <label v-if="label" :for="id">{{label}}</label>
    <slot />
    <small v-if="help" :id="id + 'Help'" class="form-text text-muted">{{help}}</small>
  </div>
</template>
  
<script>
export default {
  props: {
    id: String,
    placeholder: String,
    value: String,
    default: String,
    label: String,
    help: String
  }
};
</script>