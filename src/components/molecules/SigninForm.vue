<template>
  <Spinner v-if="loading" />
  <div v-else-if="success">
    <MessageSuccess>{{ success }}</MessageSuccess>
    <ButtonAlt @click="cancel">Close</ButtonAlt>
  </div>
  <LayoutModal v-else title="Sign in" :show="true">
    <template v-slot:body>
      <LayoutForm>
        <MessageError v-if="error">{{ error }}</MessageError>
        <input-string
          label="Email"
          placeholder="Enter email adress"
          help="Please enter the provided email address"
          v-model="email"
        />
        <input-password
          label="Password"
          placeholder="Enter password"
          help="Please enter the provided password"
          v-model="password"
          @keyup.enter="signin"
        />
      </LayoutForm>
    </template>
    <template v-slot:footer>
      <ButtonAlt @click="cancel">Cancel</ButtonAlt>
      <ButtonAction @click="signin">Sign in</ButtonAction>
    </template>
  </LayoutModal>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import ButtonAlt from "../elements/ButtonAlt.vue";
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
      email: null,
      password: null,
      loading: false,
      error: null,
      success: null
    };
  },
  components: {
    ButtonAction,
    ButtonAlt,
    InputPassword,
    InputString,
    MessageError,
    MessageSuccess,
    LayoutForm
  },
  methods: {
    signin() {
      if (this.email == null || this.password == null) {
        this.error = "Email and password should be filled in";
      } else {
        this.error = null;
        this.loading = true;
        request(
          endpoint,
          `mutation{signin(email: "${this.email}", password: "${this.password}"){status,message}}`
        )
          .then(data => {
            if (data.signin.status == "SUCCESS") {
              this.$store.commit("signin", this.email);
              this.success = "Signed in with " + this.email;
              this.$emit("signin");
            } else this.error = data.signin.message;
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
    <SigninForm v-else @login="signinTest" @cancel="display = false" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      display: false,
      email: null
    };
  },
  methods: {
    signinTest(email, password) {
      alert("login with email " + email + " and password " + password);
      this.email = email;
    }
  }
};
</script>
```

</docs>
