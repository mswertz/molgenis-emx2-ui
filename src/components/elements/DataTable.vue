<template>
  <table class="table table-bordered" :class="{ 'table-hover': selectColumn }">
    <thead>
      <tr>
        <th scope="col" style="width: 1px;">
          <slot name="root" />
        </th>
        <th scope="col" v-for="column in metadata.columns" :key="column.name">
          <b>{{column.name}}</b>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row,index) in data" :key="index" @click="onRowClick(row)">
        <td>
          <slot name="rowheader" :row="row" :metadata="metadata" />
          <input v-if="selectColumn" type="checkbox" :checked="isSelected(row)" />
        </td>
        <td v-for="(column,index2) in metadata.columns" :key="index2">
          <ul
            class="list-unstyled"
            v-if="row[column.name] && ['REF_ARRAY', 'REFBACK'].includes(column.columnType)"
          >
            <li v-for="(item,index3) in row[column.name]" :key="index3">{{item[column.refColumn]}}</li>
          </ul>
          <span
            v-else-if="row[column.name] && 'REF' === column.columnType"
          >{{row[column.name][column.refColumn]}}</span>
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
    /** set to create select boxes that will yield this columns value when selected. */
    selectColumn: String,
    /** any selected items (or one item, in case of single selection) */
    selectedItems: Array
  },
  methods: {
    isSelected(row) {
      return (
        this.selectedItems != null &&
        this.selectedItems.includes(row[this.selectColumn])
      );
    },
    onRowClick(row) {
      if (this.selectColumn !== undefined) {
        if (this.isSelected(row)) {
          /** when a row is deselected, with pkey as parameter */
          this.$emit("deselect", row[this.selectColumn]);
        } else {
          /** when a row is selected, row[this.metadata.pkey]*/
          this.$emit("select", row[this.selectColumn]);
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
      selectColumn="name"
      :selectedItems="selectedItems"
      @select="select"
      @deselect="deselect"
    >
      <template v-slot:rowheader="props">my row action {{props.row.name}}</template>
    </DataTable>
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