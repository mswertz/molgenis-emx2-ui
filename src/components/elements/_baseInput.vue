/** abstract component that is used as superclass, will not be shown in style guide */

<script>
import _formGroup from "./_formGroup.vue";

export default {
  data: function() {
    return {
      id: null,
      value: null
    };
  },
  components: {
    "form-group": _formGroup
  },
  props: {
    /** value to be shown as input */
    placeholder: String,
    /** label to be shown next to the input */
    label: String,
    /** optional help string shown below */
    help: String,
    /** whether required */
    required: Boolean,
    /** message when in error state */
    error: String
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  },
  mounted() {
    this.id = Math.random()
      .toString(36)
      .substring(7);
  }
};
</script>