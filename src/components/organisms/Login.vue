<template>
  <div v-if="!loading">
    <LoginWidget
      :username="username"
      @login="login"
      @logout="logout"
      @cancel="cancel"
      :error="error"
    />
  </div>
  <div v-else class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
import LoginWidget from "../molecules/LoginWidget.vue";
import { request } from "graphql-request";

const endpoint = "/api/graphql";

export default {
  data: function() {
    return {
      username: null,
      error: null,
      data: null,
      loading: false
    };
  },
  components: {
    LoginWidget
  },
  methods: {
    cancel() {
      this.error = null;
    },
    login(username, password) {
      this.loading = true;
      request(
        endpoint,
        `mutation{login(username: "${username}", password: "${password}"){status}}`
      )
        .then(data => {
          this.data = data;
          if (data.login.status == "SUCCESS") {
            this.username = username;
            this.$emit("login", username);
          } else this.error = "login failed";
        })
        .catch(error => (this.error = "internal server error" + error));
      this.loading = false;
    },
    logout() {
      this.loading = true;
      request(endpoint, `mutation{logout{status}}`)
        .then(data => {
          if (data.logout.status == "SUCCESS") {
            this.username = null;
            this.$emit("logout");
          } else this.error = "logout failed";
        })
        .catch(error => (this.error = "internal server error" + error));
      this.loading = false;
    }
  },
  created: function() {
    request(endpoint, `{_user{username}}`)
      .then(data => {
        if (data._user.username != "anonymous") {
          this.username = data._user.username;
        } else {
          this.username = null;
        }
      })
      .catch(error => (this.error = "internal server error" + error));
  }
};
</script>

<docs>
Example
```
<Login/>
```
</docs>