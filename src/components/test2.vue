<template>
  <div>
    <table>
      <tr v-for="row in tableData" :key="row.id">
        <td v-for="cell in row.cells" :key="cell.id" @keydown="handleKeyDown">111</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "tesTwo",
  data() {
    return {
      tableData: [
        { id: 1, cells: [ { id: 1, value: '' }, { id: 2, value: '' } ] },
        { id: 2, cells: [ { id: 3, value: '' }, { id: 4, value: '' } ] },
      ]
    };
  },
  methods: {
    handleKeyDown(event) {
      console.log('11')
      // 检查是否按下了Ctrl+V
      if (event.ctrlKey && event.keyCode === 86) {
        console.log('Ctrl+V pressed!');
      }
    }
  }
}
</script>

<style scoped>

</style>
