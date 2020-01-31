<template>
  <Spinner v-if="loading" />
  <MessageError v-else-if="error">{{ error }}</MessageError>
  <div v-else>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#" @click.prevent="view = 'home'">
        <img src="https://master.dev.molgenis.org/img/Logo_Blue_Small.png" alt />
      </a>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul v-if="schema" class="navbar-nav mr-auto">
          <li class="nav-item" :class="{'active': view === 'explorer'}">
            <a class="nav-link" href="#" @click.prevent="view = 'explorer'">Tables</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="view = 'schema'">Schema</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="view = 'import'">Import</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :href="'/api/playground.html?schema=/api/graphql/'+schema"
              target="_blank"
            >GraphQL</a>
          </li>
        </ul>
      </div>
      <Account />
    </nav>
    <div class="container" style="margin-top: 60px;">
      <div v-if="view === 'home'">
        <div class="jumbotron">
          <h1 class="display-4">Welcome on the MOLGENIS EMX 2.0 preview.</h1>
          <p class="lead">Tables, schemas, graphql. That's it.</p>
          <p>
            Choose a schema to continue
            <InputSelect v-model="schema" :items="schemaList" />
          </p>
        </div>
      </div>
      <Explorer v-if="view === 'explorer'" :schema="schema" />
      <Schema v-if="view === 'schema'" :schema="schema" />
      <Import v-if="view === 'import'" :schema="schema" />
    </div>
  </div>
</template>

<script>
import { request } from "graphql-request";

import InputSelect from "../elements/InputSelect.vue";

import Explorer from "../organisms/Explorer.vue";
import Schema from "../organisms/Schema.vue";
import Account from "../organisms/Account.vue";
import Import from "../organisms/Import.vue";

export default {
  data: function() {
    return {
      view: "home",
      schema: null,
      schemaList: [],
      error: null,
      loading: false
    };
  },
  components: {
    Explorer,
    Schema,
    Account,
    Import,
    InputSelect
  },
  computed: {
    account() {
      return this.$store.state.account.email;
    }
  },
  methods: {
    getSchemaList() {
      this.loading = true;
      request("/api/graphql", "{Schemas{name}}")
        .then(data => {
          this.schemaList = data.Schemas.map(schema => schema.name);
        })
        .catch(error => (this.error = "internal server error" + error));
      this.loading = false;
    }
  },
  watch: {
    account() {
      this.getSchemaList();
    }
  },
  created() {
    this.getSchemaList();
  }
};
</script>

<docs>
Example
```
<Molgenis/>
```
</docs>