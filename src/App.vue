<template>
  <div id="app" class="container">
    <h1>Sign in example</h1>
    <login :username="username" @login="loginTest" @logout="logoutTest" />
  </div>
</template>

<script>
import Login from "./components/Login.vue";
export default {
  name: "app",
  components: {
    Login
  },
  data: function() {
    return {
      username: null
    };
  },
  methods: {
    loginTest(username, password) {
      alert("username: " + username + ", password: " + password);
      this.username = username;
    },
    logoutTest() {
      this.username = null;
    }
  }
};
</script>

<style>
</style>
