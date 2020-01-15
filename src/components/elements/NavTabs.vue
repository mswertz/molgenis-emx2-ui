<template>
  <ul class="nav nav-tabs">
    <li v-if="label" class="nav-item">
      <a class="nav-link disabled" href="#">{{label}}</a>
    </li>
    <li v-for="(item,index) in items" :key="index" class="nav-item">
      <a
        class="nav-link"
        :class="{'active': item === value}"
        href="#"
        @click.prevent="select(item)"
      >{{item}}</a>
    </li>
  </ul>
</template>

<script>
import InputSelect from "./InputSelect";

export default {
  extends: InputSelect,
  methods: {
    select(item) {
      this.value = item;
      this.$emit("input", this.value);
    }
  },
  created() {
    if (this.default) {
      this.select(this.default);
    } else {
      this.select(this.items[0]);
    }
  }
};
</script>

<docs>
Example
```
<template>
  <div>
    <NavTabs label="Animals" v-model="selected" :items="['lion', 'ape', 'monkey']" />
    Selected: {{selected}}
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: null
    };
  }
};
</script>
```
With default
``````
<template>
  <div>
    <NavTabs label="Animals" v-model="selected" :items="['lion', 'ape', 'monkey']" default="ape" />
    Selected: {{selected}}
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: null
    };
  }
};
</script>
``````
</docs>