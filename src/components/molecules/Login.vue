<!-- menu bar size component that shows login status, and enables user to login-->
<template>
  <div>
    <span v-if="username">
      Hi {{username}}
      <button-primary @click="logout">Sign out</button-primary>
    </span>
    <button-primary v-else @click="modal=true">Sign in</button-primary>
    <login-modal v-if="modal" @login="login" @close="modal=false" />
  </div>
</template>

<!-- on mount will check login status and show login button accordingly -->
<script>
import ButtonPrimary from "../elements/ButtonPrimary.vue";
import LoginModal from "./LoginModal.vue";

export default {
  data: function() {
    return {
      /** @ignore */
      modal: false
    };
  },
  props: {
    /** when user name is provided, user is assumed to be logged in */
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
      /** when login button is pushed
       * @arg username {string}
       * @arg password {string}
       */
      this.$emit("login", username, password);
    },
    logout() {
      /** when logout button is pushed */
      this.$emit("logout");
    }
  }
};
</script>

<docs>

### Examples

```
<template>
  <div>
    <Login :username="username" @login="loginTest" @logout="logoutTest" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {
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