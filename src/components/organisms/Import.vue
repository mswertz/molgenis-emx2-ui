<template>
  <div>
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

/** Data import tool */
export default {
  data: function() {
    return {
      file: null,
      error: null,
      success: null
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
  }
};
</script>

<docs>
WORK IN PROGRESS

Example
```
<Import schema="pet store"/>

```
</docs>
