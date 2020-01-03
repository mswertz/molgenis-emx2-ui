<template>
  <form-group v-bind="$props">
    <input
      class="form-control"
      :id="id"
      :aria-describedby="id + 'Help'"
      :placeholder="placeholder"
      v-model="value"
    />
  </form-group>
</template>

<script>
import FormGroup from "./FormGroup.vue";
export default {
  data() {
    return {
      value: null
    };
  },
  props: {
    id: String,
    placeholder: String,
    default: String,
    label: String,
    help: String
  },
  components: {
    "form-group": FormGroup
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>