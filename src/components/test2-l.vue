<!-- MyTable.vue -->
<template>
  <table>
    <thead>
    <tr>
      <th v-for="column in columns" :key="column.title">{{ column.title }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in data" :key="item.id">
      <td v-for="column in columns" :key="column.title">
      </td>
    </tr>
    </tbody>
  </table>
  <slot></slot>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [] // 列配置数组
    };
  },
  mounted() {
    console.log('11',this.columns)
  },
  methods: {
    addColumn(column) {
      this.columns.push(column);
    },
    removeColumn(name) {
      this.columns = this.columns.filter(column => column.title !== name);
    },
  },
};
</script>
