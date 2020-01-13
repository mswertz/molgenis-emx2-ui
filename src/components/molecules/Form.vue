<template>
  <div>
    <LayoutCard v-if="metadata" :title="title">
      <LayoutForm>
        <span v-for="column in metadata.columns" :key="column.name">
          <InputString
            v-model="value[column.name]"
            :label="column.name"
            :required="!column.nullable"
            :error="error[column.name]"
          />
        </span>
        <ButtonCancel />
        <ButtonAction>Save</ButtonAction>
      </LayoutForm>
    </LayoutCard>State:
    <br />
    {{JSON.stringify(value,null,2)}}
    <br />Error:
    <br />
    {{JSON.stringify(error,null,2)}}
  </div>
</template>

<script>
import LayoutForm from "../elements/LayoutForm.vue";
import LayoutCard from "../elements/LayoutCard.vue";
import InputString from "../elements/InputString.vue";
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
    metadata: Object
  },
  components: {
    LayoutForm,
    LayoutCard,
    InputString,
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
    <Form :metadata="metadata" v-model="data" />
    {{JSON.stringify(object,null,2)}}
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      data: {},
      metadata: {
        name: "User",
        columns: [
          {
            name: "username",
            columnType: "STRING"
          },
          {
            name: "firstName",
            columnType: "STRING",
            nullable: true
          },
          {
            name: "lastName",
            columnType: "STRING",
            nullable: true
          },
          {
            name: "email",
            columnType: "STRING",
            validation:
              "if(!/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) 'Should be valid email address'",
            nullable: true
          },
          {
            name: "password",
            columnType: "STRING",
            nullable: true
          },
          {
            name: "phone",
            columnType: "STRING",
            nullable: true
          },
          {
            name: "userStatus",
            columnType: "INT",
            nullable: true
          },
          {
            name: "pets",
            columnType: "REF_ARRAY",
            refColumnName: "name",
            nullable: true
          }
        ]
      }
    };
  }
};
</script>
```
</docs>