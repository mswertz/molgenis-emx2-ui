<template>
  <table class="table table-bordered" :class="{ 'table-hover': selectable }">
    <thead>
      <tr>
        <th v-if="selectable"></th>
        <th v-for="column in metadata.columns" :key="column.name" scope="col">{{column.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row,index) in data" :key="index" @click="onRowClick(row)">
        <td v-if="selectable">
          <input type="checkbox" :checked="isSelected(row)" />
        </td>
        <td v-for="column in metadata.columns" :key="column.name+'_'+index">
          <ul class="list-unstyled" v-if="['REF_ARRAY', 'REFBACK'].includes(column.columnType)">
            <li v-for="item in row[column.name]" :key="item">{{item[column.refColumnName]}}</li>
          </ul>
          <span v-else-if="'REF' === column.columnType">{{row[column.name][column.refColumnName]}}</span>
          <span v-else-if="column.columnType.includes('_ARRAY')"></span>
          <span v-else>{{row[column.name]}}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
/** Data table. Has also option to have row selection. Selection events must be handled outside this view. */
export default {
  props: {
    /** molgenis table metadata object defining behavior of this table */
    metadata: Object,
    /** molgenis table data as retrieved from graphql complying with metadata */
    data: Array,
    /** set to 'true' to add a column with checkboxes. This will result in @select(row) and @deselect(row) events when used*/
    selectable: String,
    /** any selected items (or one item, in case of single selection) */
    selectedItems: Array
  },
  methods: {
    isSelected(row) {
      return (
        this.selectedItems != null &&
        this.selectedItems.includes(row[this.metadata.pkey])
      );
    },
    onRowClick(row) {
      if (this.selectable === true || this.selectable == "true") {
        if (this.isSelected(row)) {
          /** when a row is deselected, with pkey as parameter */
          this.$emit("deselect", row[this.metadata.pkey]);
        } else {
          /** when a row is selected, row[this.metadata.pkey]*/
          this.$emit("select", row[this.metadata.pkey]);
        }
      }
    }
  }
};
</script>

<docs>
Example
```
<template>
  <div>
    <DataTable
      :data="data"
      :metadata="metadata"
      selectable="true"
      :selectedItems="selectedItems"
      @select="select"
      @deselect="deselect"
    />
    Selected: {{selectedItems}}
  </div>
</template>
<script>
export default {
  methods: {
    select(value) {
      this.selectedItems.push(value);
    },
    deselect(value) {
      this.selectedItems = this.selectedItems.filter(item => item !== value);
    }
  },
  data: function() {
    return {
      selectedItems: ["spike"],
      data: [
        {
          name: "pooky",
          category: {
            name: "cat"
          },
          status: "available",
          weight: 9.4,
          orders: [
            {
              orderId: "1"
            }
          ]
        },
        {
          name: "spike",
          category: {
            name: "dog"
          },
          status: "sold",
          tags: [
            {
              name: "red"
            },
            {
              name: "green"
            }
          ],
          weight: 15.7,
          orders: [
            {
              orderId: "2"
            }
          ]
        }
      ],
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
            refColumnName: "name"
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
            refColumnName: "name"
          },
          {
            name: "weight",
            columnType: "DECIMAL"
          },
          {
            name: "orders",
            columnType: "REFBACK",
            refColumnName: "orderId"
          }
        ]
      }
    };
  }
};
</script>
```


</docs>