<template>
  <div>
    <MessageError v-if="error">{{error}}</MessageError>
    <MessageSuccess v-if="success">{{success}}</MessageSuccess>
    <InputSelect
      v-model="schema"
      :items="schemaList"
      :selected="schema"
      placeholder="Choose schema"
    />
    <InputFile v-model="file" :file="file" />
    <ButtonCancel @click="cancel">Cancel</ButtonCancel>
    <ButtonAction @click="upload">Import</ButtonAction>
  </div>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import ButtonCancel from "../elements/ButtonCancel.vue";
import InputSelect from "../elements/InputSelect.vue";
import InputFile from "../elements/InputFile.vue";
import MessageError from "../elements/MessageError.vue";
import MessageSuccess from "../elements/MessageSuccess.vue";

import { request } from "graphql-request";

const endpoint = "/api/graphql";

export default {
  data: function() {
    return {
      schema: null,
      file: null,
      schemaList: [],
      error: null,
      success: null
    };
  },
  components: {
    ButtonAction,
    ButtonCancel,
    InputFile,
    InputSelect,
    MessageError,
    MessageSuccess
  },
  methods: {
    upload() {
      let form = new FormData();
      form.append("file", this.file);
      let url = "/api/zip/" + this.schema;
      fetch(url, {
        method: "POST",
        body: form
      })
        .then(response => {
          if (response.ok) {
            //todo make proper json
            response.text().then(success => {
              this.success = success;
              this.error = null;
            });
          } else {
            response.json().then(error => {
              this.success = null;
              this.error = error.message;
            });
          }
        })
        .catch(error => {
          this.error = error;
        });
    },
    cancel() {
      this.schemaSelected = null;
      this.file = null;
    }
  },
  created: function() {
    request(endpoint, `{Schemas{name}}`)
      .then(data => {
        this.schemaList = [];
        data.Schemas.forEach(element => {
          this.schemaList.push(element.name);
        });
      })
      .catch(error => (this.error = "internal server error: " + error));
  }
};
</script>

<docs>
WORK IN PROGRESS

Example
```
<Import/>

```
</docs>