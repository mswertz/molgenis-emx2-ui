<template>
  <LayoutNavTabs v-model="view" :items="['Members', 'Roles']"> </LayoutNavTabs>
</template>
<script>
/** manage members and roles of a group (aka schema). */
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
