<template>
  <Spinner v-if="loading" />
  <div v-else>
    {{loading}}
    <MessageError v-if="error">{{ error }}</MessageError>
    <MessageSuccess v-if="success">{{ success }}</MessageSuccess>
    <InputFile v-model="file" :file="file" />
    <ButtonAlt @click="cancel">Cancel</ButtonAlt>
    <ButtonAction @click="upload">Import</ButtonAction>
  </div>
</template>

<script>
import ButtonAction from "../elements/ButtonAction.vue";
import ButtonAlt from "../elements/ButtonAlt.vue";
import InputFile from "../elements/InputFile.vue";
import MessageError from "../elements/MessageError.vue";
import MessageSuccess from "../elements/MessageSuccess.vue";
import Spinner from "../elements/Spinner.vue";

/** Data import tool */
export default {
  data: function() {
    return {
      file: null,
      error: null,
      success: null,
      loading: false
    };
  },
  props: {
    schema: String
  },
  components: {
    ButtonAction,
    ButtonAlt,
    InputFile,
    MessageError,
    MessageSuccess,
    Spinner
  },
  methods: {
    upload() {
      this.error = null;
      this.success = null;
      this.loading = true;
      let form = new FormData();
      form.append("file", this.file);
      let url = "/api/excel/" + this.schema;
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
              this.error = error.errors;
            });
          }
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          this.loading = false;
        });
    },
    cancel() {
      this.schemaSelected = null;
      this.file = null;
    }
  }
};
</script>

<docs>
Example
```
<Import schema="pet store"/>

```
</docs>
