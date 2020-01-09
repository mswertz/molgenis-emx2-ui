<template>
  <form-group v-bind="$props">
    <div class="custom-file">
      <input type="file" class="custom-file-input" ref="file" :id="id" @change="handleFileUpload" />
      <label class="custom-file-label" :for="id">
        <span v-if="value">{{filename}}</span>
        <span v-else-if="placeholder">{{placeholder}}</span>
        <span v-else>Choose file</span>
      </label>
    </div>
  </form-group>
</template>

<script>
import _formGroup from "./_formGroup.vue";

export default {
  extends: _formGroup,
  data: function() {
    return {
      value: null,
      filename: null
    };
  },
  props: {
    file: String
  },
  methods: {
    handleFileUpload() {
      this.value = this.$refs.file.files[0];
      this.filename = this.$refs.file.files[0].name;
    }
  },
  components: {
    "form-group": _formGroup
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    file(newValue) {
      this.value = newValue;
    }
  }
};
</script>

<docs>
Example
```
<template>
  <div>
    <InputFile label="My file input" id="test" v-model="check" :file="check" />
    Selected: {{check}}
    <ButtonAction @click="clear">Clear</ButtonAction>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      check: null
    };
  },
  methods: {
    clear() {
      this.check = null;
    }
  }
};
</script>

```
</docs>