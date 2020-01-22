<template>
  <MessageSuccess v-if="success">{{ success }}</MessageSuccess>
  <div v-else-if="loading" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <LayoutForm v-else>
    <MessageError v-if="error">{{ error }}</MessageError>
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
      @keyup.enter="login"
    />
    <ButtonCancel @click="cancel">Cancel</ButtonCancel>
    <ButtonAction @click="login">Sign in</ButtonAction>
  </LayoutForm>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import ButtonCancel from "../elements/ButtonCancel.vue";
import InputString from "../elements/InputString.vue";
import InputPassword from "../elements/InputPassword.vue";
import MessageError from "../elements/MessageError.vue";
import MessageSuccess from "../elements/MessageSuccess.vue";
import LayoutForm from "../elements/LayoutForm.vue";

import { request } from "graphql-request";

const endpoint = "/api/graphql";

export default {
  data: function() {
    return {
      username: null,
      password: null,
      loading: false,
      error: null,
      success: null
    };
  },
  components: {
    ButtonAction,
    ButtonCancel,
    InputPassword,
    InputString,
    MessageError,
    MessageSuccess,
    LayoutForm
  },
  methods: {
    login() {
      /** when login is pushed
       * @arg username {string}
       * @arg password {string}
       */
      if (this.username == null || this.password == null) {
        this.error = "Username and password should be filled in";
      } else {
        this.error = null;
        this.loading = true;
        request(
          endpoint,
          `mutation{login(username: "${this.username}", password: "${this.password}"){status}}`
        )
          .then(data => {
            if (data.login.status == "SUCCESS") {
              this.$store.commit("login", this.username);
              this.success = "Logged in as " + this.username;
              this.$emit("login");
            } else this.error = "login failed";
          })
          .catch(error => (this.error = "internal server error" + error));
        this.loading = false;
      }
    },
    cancel() {
      /**
       * when cancel is pushed
       */
      this.error = null;
      this.$emit("cancel");
    }
  }
};
</script>

<docs>
Example
```
<template>
  <div>
    <ButtonAction v-if="display == false" @click="display=true">Show</ButtonAction>
    <LoginForm v-else @login="loginTest" @cancel="display = false" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      display: false,
      username: null
    };
  },
  methods: {
    loginTest(username, password) {
      alert("login with username " + username + " and password " + password);
      this.username = username;
    }
  }
};
</script>
```

</docs>
