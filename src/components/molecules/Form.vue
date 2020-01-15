<template>
  <div>
    <LayoutCard v-if="metadata" :title="title">
      <LayoutForm>
        <span v-for="column in metadata.columns" :key="column.name">
          <InputColumn
            :schema="schema"
            :label="column.name"
            :columnType="column.columnType"
            :refTable="column.refTable"
            :refColumn="column.refColumn"
            :nullable="column.nullable"
            v-model="value[column.name]"
            :default="defaultValue[column.name]"
            :error="error[column.name]"
          />
        </span>
        <ButtonCancel />
        <ButtonAction>Save</ButtonAction>
      </LayoutForm>
    </LayoutCard>
    <br />State:
    <br />
    {{JSON.stringify(value,null,2)}}
    <br />br />Default:
    <br />
    {{JSON.stringify(defaultValue,null,2)}}
    <br />Error:
    <br />
    {{JSON.stringify(error,null,2)}}
  </div>
</template>

<script>
import LayoutForm from "../elements/LayoutForm.vue";
import LayoutCard from "../elements/LayoutCard.vue";
import InputColumn from "../molecules/InputColumn.vue";
import ButtonAction from "../elements/ButtonAction.vue";
import ButtonCancel from "../elements/ButtonCancel.vue";

export default {
  data: function() {
    return {
      value: {},
      error: {}
    };
  },
  props: {
    metadata: Object,
    schema: String,
    defaultValue: Object
  },
  components: {
    LayoutForm,
    LayoutCard,
    InputColumn,
    ButtonAction,
    ButtonCancel
  },
  watch: {
    value: {
      handler() {
        this.metadata.columns.forEach(column => {
          delete this.error[column.name];
          if (
            //when empty
            this.value[column.name] == null ||
            /^\s*$/.test(this.value[column.name])
          ) {
            if (
              //when required
              column.nullable != true
            ) {
              this.error[column.name] = column.name + " is required ";
            }
          } else {
            //when not empty
            if (
              //when validation
              typeof this.value[column.name] !== "undefined" &&
              typeof column.validation !== "undefined"
            ) {
              let value = this.value[column.name];
              this.error[column.name] = value;
              this.error[column.name] = eval(column.validation);
            }
          }
        });
      },
      deep: true
    }
  },
  computed: {
    title() {
      return "Edit '" + this.metadata.name + "'";
    }
  }
};
</script>

<docs>Example

```
<template>
  <div>
    <Form :metadata="metadata" v-model="value" :defaultValue="value" schema="pet store" />
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
            columnType: "STRING"
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