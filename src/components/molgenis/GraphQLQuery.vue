<template>
  <div>
    <ButtonPrimary @click="load">Load</ButtonPrimary>
    <br />
    path: {{path}}
    <br />
    query: {{query}}
    <br />
    data: {{data}}
    <br />
    error: {{error}}
  </div>
</template>

<script>
import { request } from "graphql-request";
import ButtonPrimary from "../elements/ButtonPrimary.vue";

export default {
  data: function() {
    return {
      data: null,
      error: null
    };
  },
  props: {
    path: String,
    query: String
  },
  components: {
    ButtonPrimary
  },
  methods: {
    load() {
      this.error = null;
      request(this.path, this.query)
        .then(data => (this.data = data))
        .catch(error => (this.error = error));
    }
  }
};
</script>

<docs>
Example
```
<GraphQLQuery path="/api/graphql" query="{_user{username}}"/>
```
</docs>