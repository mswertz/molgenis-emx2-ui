<template>
  <div>
    <LayoutCard v-if="metadata" :title="metadata.name">
      <LayoutForm>
        <span v-for="column in metadata.columns" :key="column.name">
          <StringInput :id="column.name" />
        </span>
      </LayoutForm>
    </LayoutCard>
  </div>
</template>

<script>
import LayoutForm from "../elements/LayoutForm.vue";
import LayoutCard from "../elements/LayoutCard.vue";

export default {
  data: function() {
    return {
      data: null
    };
  },
  props: {
    metadata: Object
  },
  components: {
    LayoutForm,
    LayoutCard
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
            columnType: "STRING"
          },
          {
            name: "lastName",
            columnType: "STRING"
          },
          {
            name: "email",
            columnType: "STRING",
            validation:
              "if(!/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) 'Should be valid email address'"
          },
          {
            name: "password",
            columnType: "STRING"
          },
          {
            name: "phone",
            columnType: "STRING"
          },
          {
            name: "userStatus",
            columnType: "INT"
          },
          {
            name: "pets",
            columnType: "REF_ARRAY",
            refColumnName: "name"
          }
        ]
      }
    };
  }
};
</script>
```
</docs>