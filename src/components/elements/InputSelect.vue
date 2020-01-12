<template>
  <form-group :id="id" :label="label" :placeholder="placeholder" :help="help">
    <select class="custom-select" :id="id" v-model="value">
      <option selected hidden>blaat</option>
      <option v-for="(item,index) in items" :key="index" :value="item">{{item}}</option>
    </select>
  </form-group>
</template>

<script>
import _baseInput from "./_baseInput.vue";

export default {
  extends: _baseInput,
  props: {
    selected: String,
    items: Array
  },
  watch: {
    selected(newValue) {
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
    <InputSelect
      label="Animals"
      v-model="check"
      :selected="check"
      :items="['lion', 'ape', 'monkey']"
    />
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