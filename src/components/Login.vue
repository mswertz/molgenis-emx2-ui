<!-- menu bar size component that shows login status, and enables user to login-->
<template>
  <div>
    <span v-if="username">
      Hi {{username}}
      <button-primary title="Sign out" @click="logout" />
    </span>
    <button-primary v-else title="Sign in" @click="modal=true" />
    <login-modal v-if="modal" @login="login" @close="modal=false" />
  </div>
</template>

<!-- on mount will check login status and show login button accordingly -->
<script>
import ButtonPrimary from "./ButtonPrimary.vue";
import LoginModal from "./LoginModal.vue";

export default {
  data: function() {
    return {
      modal: false
    };
  },
  props: {
    username: String
  },
  watch: {
    username: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val) {
        if (val != null) this.modal = false;
      }
    }
  },
  components: {
    ButtonPrimary,
    LoginModal
  },
  methods: {
    login(username, password) {
      this.$emit("login", username, password);
    },
    logout() {
      this.$emit("logout");
    }
  }
};
</script>