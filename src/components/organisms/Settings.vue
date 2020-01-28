<template>
  <LayoutNavTabs v-model="view" :items="['Members', 'Roles']"> </LayoutNavTabs>
</template>
<script>
/** manage settings of a schema */
export default {
  data: function() {
    return {
      view: "Members"
    };
  },
  methods: {}
};
</script>

<docs>
</docs>
