<template>
  <Form>
    <MessageError v-if="error">{{error}}</MessageError>
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
    <ButtonCancel @click="cancel">Cancel</ButtonCancel>
    <ButtonAction @click="login">Sign in</ButtonAction>
  </Form>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import ButtonCancel from "../elements/ButtonCancel.vue";
import InputString from "../elements/InputString.vue";
import InputPassword from "../elements/InputPassword.vue";
import MessageError from "../elements/MessageError.vue";
import Form from "../containers/Form.vue";

export default {
  data: function() {
    return {
      username: null,
      password: null
    };
  },
  props: {
    error: String
  },
  components: {
    ButtonAction,
    ButtonCancel,
    InputPassword,
    InputString,
    MessageError,
    Form
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
        this.$emit("login", this.username, this.password);
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