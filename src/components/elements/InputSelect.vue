<template>
  <form-group v-bind="$props">
    <select class="custom-select" :id="id" v-model="value">
      <option selected hidden>blaat</option>
      <option v-for="(item,index) in items" :key="index" :value="item">{{item}}</option>
    </select>
  </form-group>
</template>

<script>
import _formGroup from "./_formGroup.vue";

export default {
  extends: _formGroup,
  data: function() {
    return {
      value: null
    };
  },
  props: {
    selected: String,
    items: Array
  },
  components: {
    "form-group": _formGroup
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
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
      id="someid"
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