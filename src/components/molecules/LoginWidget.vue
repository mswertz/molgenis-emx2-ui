<!-- menu bar size component that shows login status, and enables user to login-->
<template>
  <div>
    <span v-if="username">
      Hi {{username}}
      <ButtonAction @click="logout">Sign out</ButtonAction>
    </span>
    <ButtonAction v-else @click="modal=true">Sign in</ButtonAction>
    <LayoutModal v-if="modal" title="Sign in" @close="cancel" show="true">
      <LoginForm @login="login" @cancel="cancel" :error="error" />
    </LayoutModal>
  </div>
</template>

<!-- on mount will check login status and show login button accordingly -->
<script>
import ButtonAction from "../elements/ButtonAction.vue";
import LoginForm from "./LoginForm.vue";
import LayoutModal from "../elements/LayoutModal.vue";

/** Login widget small enough to fit on the screen */
export default {
  data: function() {
    return {
      /** @ignore */
      modal: false
    };
  },
  props: {
    /** when user name is provided, user is assumed to be logged in */
    username: String,
    /** Error string to be shown in the login dialogue */
    error: String
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
    ButtonAction,
    LoginForm,
    LayoutModal
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
    },
    cancel() {
      this.modal = false;
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
    <LoginWidget :username="username" @login="loginTest" @logout="logoutTest" />
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