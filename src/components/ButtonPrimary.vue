<template>
  <a v-if="href" type="button" class="btn btn-primary" :href="href">{{title}}</a>
  <button v-else type="button" class="btn btn-primary" @click="onClick">{{title}}</button>
</template>

<script>
export default {
  props: {
    href: String,
    title: String
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>