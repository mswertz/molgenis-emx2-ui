<template>
  <modal title="Sign in" @close="close" display="true">
    <Form>
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
      <ButtonLink @click="close">Cancel</ButtonLink>
      <ButtonPrimary @click="login">Sign in</ButtonPrimary>
    </Form>
  </modal>
</template>

<script>
import ButtonPrimary from "../elements/ButtonPrimary.vue";
import ButtonLink from "../elements/ButtonLink.vue";
import InputString from "../elements/InputString.vue";
import InputPassword from "../elements/InputPassword.vue";
import Form from "../containers/Form.vue";
import Modal from "../containers/Modal.vue";

export default {
  data: function() {
    return {
      username: null,
      password: null
    };
  },
  components: {
    ButtonPrimary,
    ButtonLink,
    InputPassword,
    InputString,
    Form,
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