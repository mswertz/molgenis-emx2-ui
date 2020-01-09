<template>
  <div>
    <MessageError v-if="error">{{error}}</MessageError>
    {{table}}
  </div>
</template>

<script>
import MessageError from "../elements/MessageError.vue";

import { request } from "graphql-request";

export default {
  data: function() {
    return {
      data: [{}],
      error: null
    };
  },
  props: {
    graphql: String,
    endpoint: String
  },
  components: {
    MessageError
  },
  computed: {
    table() {
        
      return Object.values(this.data)[0].data;
    }
  },
  methods: {
    reload() {
      request(this.endpoint, this.graphql)
        .then(data => {
          this.data = data;
        })
        .catch(error => (this.error = "internal server error" + error));
    }
  },
  created() {
    this.reload();
  },
  watch: {
    graphql() {
      this.reload();
    }
  }
};
</script>

<docs>
Example
```
<Table endpoint="/api/graphql/pet%20store" graphql="{Pet{data{name,tags{name},status}}}"/>
```
</docs>