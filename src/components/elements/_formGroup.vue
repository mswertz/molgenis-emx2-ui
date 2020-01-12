/** internal component that will not be shown in style guide */

<template>
  <div class="form-group">
    <label v-if="label" :for="id">
      {{label}}
      <span v-if="required">*</span>
    </label>
    <slot />
    <div v-if="error" class="invalid-feedback">{{error}}</div>
    <div v-else-if="help" :id="id + 'Help'" class="form-text text-muted">{{help}}</div>
  </div>
</template>
  
<script>
export default {
  props: {
    /** id for which this is the group */
    id: String,
    /** value to be shown as input */
    placeholder: String,
    /** label to be shown next to the input */
    label: String,
    /** optional help string shown below */
    help: String,
    /** required */
    required: Boolean,
    /** String with error state */
    error: String
  }
};
</script>