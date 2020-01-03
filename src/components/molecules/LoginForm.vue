<template>
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
</template>

<script>
import ButtonPrimary from "../elements/ButtonPrimary.vue";
import ButtonLink from "../elements/ButtonLink.vue";
import InputString from "../elements/InputString.vue";
import InputPassword from "../elements/InputPassword.vue";
import Form from "../containers/Form.vue";

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
    Form
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

<docs>

### Example

```
<template>
  <div>
    <ButtonPrimary v-if="display == false" @click="display=true">Show</ButtonPrimary>
    <LoginForm v-else @login="loginTest" @logout="logoutTest" @close="display = false" />
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
    },
    logoutTest() {
      alert("logout");
      this.username = null;
    }
  }
};
</script>
```

</docs>