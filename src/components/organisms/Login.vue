<template>
  <div v-if="!loading">
    <div>
      <span v-if="username">
        Hi {{ username }}
        <ButtonAction @click="logout">Sign out</ButtonAction>
      </span>
      <span v-else>
        <ButtonAction @click="modal = true">Sign in</ButtonAction>
        <LayoutModal v-if="modal" title="Sign in" @close="cancel" show="true">
          <LoginForm @cancel="cancel" :error="error" />
        </LayoutModal>
      </span>
    </div>
  </div>
  <div v-else class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import LoginForm from "../molecules/LoginForm.vue";
import LayoutModal from "../elements/LayoutModal.vue";

import { request } from "graphql-request";
const endpoint = "/api/graphql";

export default {
  data: function() {
    return {
      /** @ignore */
      modal: false,
      error: null,
      loading: false
    };
  },
  components: {
    ButtonAction,
    LoginForm,
    LayoutModal
  },
  computed: {
    username() {
      return this.$store.state.login.username;
    }
  },
  methods: {
    cancel() {
      this.modal = false;
      this.error = null;
    },
    logout() {
      this.loading = true;
      request(endpoint, `mutation{logout{status}}`)
        .then(data => {
          if (data.logout.status == "SUCCESS") {
            this.$store.commit("logout");
          } else this.error = "logout failed";
        })
        .catch(error => (this.error = "internal server error" + error));
      this.loading = false;
    }
  },
  watch: {
    username() {
      this.modal = false;
    }
  },
  created: function() {
    request(endpoint, `{_user{username}}`)
      .then(data => {
        if (data._user.username != "anonymous") {
          this.$store.commit("login", data._user.username);
        } else {
          this.$store.commit("logout");
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
<Login/>
```
</docs>
