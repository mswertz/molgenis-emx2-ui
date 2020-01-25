<template>
  <div v-if="showLogin">
    <MessageError v-if="error">{{ error }}</MessageError>
    <LoginForm @login="loginSuccess" @cancel="cancel" />
  </div>
  <LayoutModal v-else :title="title" :show="true" @close="$emit('close')">
    <template v-slot:body>
      <LayoutForm v-if="metadata && (pkey == null || defaultValue)">
        <span v-for="column in metadata.columns" :key="column.name">
          <RowFormInput
            v-model="value[column.name]"
            :schema="schema"
            :label="column.name"
            :columnType="column.columnType"
            :refTable="column.refTable"
            :refColumn="column.refColumn"
            :nullable="column.nullable"
            :defaultValue="defaultValue ? defaultValue[column.name] : undefined"
            :error="errorPerColumn[column.name]"
            :readonly="column.readonly || (pkey && column.pkey)"
          />
        </span>
      </LayoutForm>
    </template>
    <template v-slot:footer>
      <MessageSuccess v-if="success">{{ success }}</MessageSuccess>
      <MessageError v-if="error">{{ error }}</MessageError>
      <ButtonAlt @click="$emit('close')">Close</ButtonAlt>
      <ButtonAction @click="executeCommand">{{ title }}</ButtonAction>
    </template>
  </LayoutModal>
</template>

<script>
import LayoutForm from "../elements/LayoutForm.vue";
import LayoutModal from "../elements/LayoutModal.vue";

import ButtonAction from "../elements/ButtonAction.vue";
import ButtonAlt from "../elements/ButtonAlt.vue";
import _graphqlTableMixin from "./_graphqlTableMixin";

import RowFormInput from "./RowFormInput.vue";

import { request } from "graphql-request";

export default {
  mixins: [_graphqlTableMixin],
  data: function() {
    return {
      showLogin: false,
      value: {},
      errorPerColumn: {},
      success: null,
      defaultValue: null
    };
  },
  props: {
    /** when updating existing record, this is the primary key value*/
    pkey: String
  },
  components: {
    LayoutForm,
    RowFormInput,
    ButtonAction,
    ButtonAlt,
    LayoutModal
  },
  methods: {
    loginSuccess() {
      this.error = null;
      this.success = null;
      this.showLogin = false;
    },
    executeCommand() {
      this.error = null;
      this.success = null;
      //todo spinner
      let name = this.metadata.name;
      let variables = { value: [this.value] };
      let query = `mutation insert($value:[${name}Input]){insert(${name}:$value){message}}`;
      if (this.pkey) {
        query = `mutation update($value:[${name}Input]){update(${name}:$value){message}}`;
      }
      request(this.endpoint, query, variables)
        .then(data => {
          if (data.insert) {
            this.success = data.insert.message;
          }
          if (data.update) {
            this.success = data.update.message;
          }
          this.pkey = this.value[this.metadata.pkey];
          this.defaultValue = this.value;
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.error =
              "Schema doesn't exist or permission denied. Do you need to Sign In?";
            this.showLogin = true;
          } else {
            this.error = error;
          }
        });
    }
  },
  computed: {
    //override from tableMixin
    graphql() {
      //todo: must become a typed variable in the query?
      return `{${this.table}(filter:{${this.metadata.pkey}:{equals:"${this.pkey}"}}){data{${this.columnNames}}}}`;
    },
    title() {
      if (this.pkey) {
        return `update ${this.metadata.name}`;
      } else {
        return `insert ${this.metadata.name}`;
      }
    }
  },
  watch: {
    data(val) {
      let data = val[0];
      let defaultValue = {};
      this.metadata.columns.forEach(column => {
        if (data[column.name]) {
          if (column.columnType === "REF") {
            defaultValue[column.name] = data[column.name][column.refColumn];
          } else if (["REF_ARRAY", "REFBACK"].includes(column.columnType)) {
            if (data[column.name]) {
              defaultValue[column.name] = [];
              data[column.name].forEach(value =>
                defaultValue[column.name].push(value[column.refColumn])
              );
            }
            //TODO array types
          } else {
            defaultValue[column.name] = data[column.name];
          }
        }
      });
      this.defaultValue = defaultValue;
    },
    //validation happens here
    value: {
      handler() {
        this.metadata.columns.forEach(column => {
          //make really empty if empty
          if (/^\s*$/.test(this.value[column.name])) {
            delete this.value[column.name];
          }
          delete this.errorPerColumn[column.name];
          if (
            //when empty
            this.value[column.name] == null
          ) {
            if (
              //when required
              column.nullable != true
            ) {
              this.errorPerColumn[column.name] = column.name + " is required ";
            }
          } else {
            //when not empty
            if (
              //when validation
              typeof this.value[column.name] !== "undefined" &&
              typeof column.validation !== "undefined"
            ) {
              let value = this.value[column.name];
              this.errorPerColumn[column.name] = value;
              this.errorPerColumn[column.name] = eval(column.validation);
            }
          }
        });
      },
      deep: true
    }
  }
};
</script>

<docs>
Example
```
<RowForm schema="pet store" table="Pet" />

```
Example with lazy load based on pkey
```
<RowForm schema="pet store" table="Pet" pkey="spike" />
```

Example with default value explicityly set
```
<template>
  <div>
    <RowForm schema="pet store" table="Pet" v-model="value" :defaultValue="value" />
    {{JSON.stringify(object,null,2)}}
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      value: {
        name: "spike",
        tags: ["red", "green"],
        status: "sold",
        orders: ["2"]
      },
      metadata: {
        name: "Pet",
        pkey: "name",
        columns: [
          {
            name: "name",
            columnType: "STRING",
            pkey: true
          },
          {
            name: "category",
            columnType: "REF",
            refTable: "Category",
            refColumn: "name"
          },
          {
            name: "photoUrls",
            columnType: "STRING_ARRAY"
          },
          {
            name: "status",
            columnType: "STRING"
          },
          {
            name: "tags",
            columnType: "REF_ARRAY",
            refTable: "Tag",
            refColumn: "name"
          },
          {
            name: "weight",
            columnType: "DECIMAL"
          },
          {
            name: "orders",
            columnType: "REFBACK",
            refTable: "Order",
            refColumn: "orderId",
            mappedBy: "pet"
          }
        ]
      }
    };
  }
};
</script>
```
</docs>
