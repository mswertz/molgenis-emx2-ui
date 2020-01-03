<template>
  <div
    v-if="display"
    class="modal fade show"
    role="dialog"
    style="display:block"
    tabindex="-1"
    aria-modal="true"
    @click="closeUnlessInDialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div v-if="title" class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    display: Boolean
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeUnlessInDialog() {
      if (event.target == event.currentTarget) {
        this.$emit("close");
      }
    }
  }
};
</script>