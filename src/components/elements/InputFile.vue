<template>
  <form-group :id="id" :label="label" :placeholder="placeholder" :help="help">
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
import _baseInput from "./_baseInput.vue";

export default {
  extends: _baseInput,
  data: function() {
    return {
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
  watch: {
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
    <InputFile label="My file input" v-model="check" :file="check" />
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