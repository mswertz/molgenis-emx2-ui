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
          <!-- @slot contents to be shown on the modal -->
          <slot />
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
    display: {
      type: Boolean,
      default: true
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

<docs>

Example

```
<template>
  <div>
    <ButtonAction @click="toggle">Toggle modal</ButtonAction>
    <Modal title="My first modal" @close="toggle" :display="display">
      Here is the contents
      <p />
      <ButtonAction @click="toggle">My own additional close</ButtonAction>
    </Modal>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      display: false
    };
  },
  methods: {
    toggle() {
      this.display = !this.display;
    }
  }
};
</script>
```

</docs>