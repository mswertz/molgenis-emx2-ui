<template>
  <modal title="Sign in" @close="close" display="true">
    <form-vertical>
      <input-string
        label="Username"
        placeholder="Enter name"
        help="Please enter the provided username"
        v-model="username"
      />
      <input-password
        label="Password"
        placeholder="Enter password"
        help="Please enter the provided password"
        v-model="password"
      />
      <button-primary title="Sign in" @click="login" />
    </form-vertical>
  </modal>
</template>

<script>
import ButtonPrimary from "./ButtonPrimary.vue";
import InputString from "./InputString.vue";
import InputPassword from "./InputPassword.vue";
import FormVertical from "./FormVertical.vue";
import Modal from "./Modal.vue";

export default {
  data: function() {
    return {
      username: null,
      password: null
    };
  },
  components: {
    ButtonPrimary,
    InputPassword,
    InputString,
    FormVertical,
    Modal
  },
  methods: {
    login() {
      this.$emit("login", this.username, this.password);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>