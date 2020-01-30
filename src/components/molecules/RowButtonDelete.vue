<template>
  <div>
    <LayoutModal v-if="open" :title="title" @close="closeForm">
      <template v-slot:body>
        <MessageSuccess v-if="success">{{ success }}</MessageSuccess>
        <MessageError v-else-if="error">{{ error }}</MessageError>
        <div v-else>
          Delete
          <strong>{{ table }}({{ pkey }})</strong>
          <br />Are you sure?
          <br />
        </div>
      </template>
      <template v-slot:footer>
        <ButtonAlt @click="closeForm">Close</ButtonAlt>
        <ButtonAction v-if="!success && !success" @click="executeDelete">Delete</ButtonAction>
      </template>
    </LayoutModal>
    <IconDanger icon="trash" @click="openForm" />
  </div>
</template>

<script>
import RowButtonAdd from "./RowButtonAdd";
import LayoutModal from "../elements/LayoutModal";
import IconDanger from "../elements/IconDanger";
import ButtonAlt from "../elements/ButtonAlt";
import ButtonAction from "../elements/ButtonAction";
import MessageError from "../elements/MessageError";
import MessageSuccess from "../elements/MessageSuccess";

import { request } from "graphql-request";

export default {
  extends: RowButtonAdd,
  data: function() {
    return {
      success: null,
      error: null
    };
  },
  components: {
    LayoutModal,
    IconDanger,
    ButtonAction,
    ButtonAlt,
    MessageSuccess,
    MessageError
  },
  props: {
    pkey: String
  },
  computed: {
    title() {
      return `Delete from ${this.table}`;
    },
    endpoint() {
      return "/api/graphql/" + this.schema;
    }
  },
  methods: {
    executeDelete() {
      let query = `mutation delete($pkey:[String]){delete(${this.table}:$pkey){message}}`;
      let variables = { pkey: [this.pkey] };
      request(this.endpoint, query, variables)
        .then(data => {
          this.success = data.delete.message;
        })
        .catch(error => {
          this.error = error.response.errors[0].message;
        });
    }
  }
};
</script>

<docs>Example

```
<RowButtonDelete schema="pet store" table="Pet" pkey="spike" />
```
</docs>
