<template>
  <Spinner v-if="loading" />
  <div v-else>
    <div>
      <span v-if="email">
        Hi {{ email }}
        <ButtonAction @click="signout">Sign out</ButtonAction>
      </span>
      <span v-else>
        <ButtonAction @click="showSigninForm = true">Sign in</ButtonAction>
        <LayoutModal
          v-if="showSigninForm"
          title="Sign in"
          @close="closeSigninForm"
          show="true"
        >
          <SigninForm @cancel="closeSigninForm" :error="error" />
        </LayoutModal>
        <ButtonCancel @click="showSignupForm = true">Sign up</ButtonCancel>
        <LayoutModal
          v-if="showSignupForm"
          title="Sign up"
          @close="closeSignupForm"
          show="true"
        >
          <SignupForm @cancel="closeSignupForm" :error="error" />
        </LayoutModal>
      </span>
    </div>
  </div>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import SigninForm from "../molecules/SigninForm.vue";
import SignupForm from "../molecules/SignupForm.vue";
import LayoutModal from "../elements/LayoutModal.vue";

import { request } from "graphql-request";
const endpoint = "/api/graphql";

export default {
  data: function() {
    return {
      /** @ignore */
      showSigninForm: false,
      showSignupForm: false,
      error: null,
      loading: false
    };
  },
  components: {
    ButtonAction,
    SigninForm,
    SignupForm,
    LayoutModal
  },
  computed: {
    email() {
      return this.$store.state.account.email;
    }
  },
  methods: {
    closeSigninForm() {
      this.showSigninForm = false;
      this.error = null;
    },
    closeSignupForm() {
      this.showSignupForm = false;
      this.error = null;
    },
    signout() {
      this.loading = true;
      request(endpoint, `mutation{signout{status}}`)
        .then(data => {
          if (data.signout.status == "SUCCESS") {
            this.$store.commit("signout");
          } else this.error = "sign out failed";
        })
        .catch(error => (this.error = "internal server error" + error));
      this.loading = false;
    }
  },
  watch: {
    email() {
      this.showSigninForm = false;
      this.showSignupForm = false;
    }
  },
  created: function() {
    request(endpoint, `{_user{email}}`)
      .then(data => {
        if (data._user.email != "anonymous") {
          this.$store.commit("signin", data._user.email);
        } else {
          this.$store.commit("signout");
        }
      })
      .catch(error => {
        if (error.response.status === 504) {
          this.error = "Error. Server cannot be reached.";
        } else {
          this.error = "internal server error " + error;
        }
      });
  }
};
</script>

<docs>
Example
```
<Account/>
```
</docs>
