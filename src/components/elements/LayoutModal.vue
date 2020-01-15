<template>
  <div>
    <div
      v-if="show"
      class="modal fade show"
      role="dialog"
      style="display:block"
      tabindex="-1"
      aria-modal="true"
      @click="closeUnlessInDialog"
    >
      <div v-if="show" class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
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
          <div class="modal-body" style="overflow: scroll">
            <!-- @slot contents to be shown on the modal -->
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** Shown as the title of the model */
    title: String,
    /** When true the modal will be shown */
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      /** when the close x button is clicked */
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

<style scoped>
.modal {
  background: white;
}
</style>

<docs>

Example

```
<template>
  <div>
    <ButtonAction @click="toggle">Toggle modal</ButtonAction>
    <LayoutModal title="My first modal" @close="toggle" :show="show">
      Here is the contents
      <p />
      <ButtonAction @click="toggle">My own additional close</ButtonAction>
    </LayoutModal>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  }
};
</script>
```

</docs>