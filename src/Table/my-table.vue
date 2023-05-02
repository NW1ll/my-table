<template>
  <table class="pure-table pure-table-bordered" @contextmenu.prevent="handleContextMenu" @keydown="handleKeyDown">
    <thead>
    <tr>
      <th v-for="column in columns" :key="column.field">{{ column.title }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row,rowIndex) in rows" :key="row.id">
      <td v-for="(column,colIndex) in columns" :key="column.field"
          :class="{ selected: isSelected(rowIndex, colIndex) }"
          @mousedown="handleMouseDown(rowIndex, colIndex)"
          @mousemove="handleMouseMove(rowIndex, colIndex)"
          @mouseup="handleMouseUp"
          @click="handleClick"
          @keydown="handleKeyDown"
          @paste="pasteCells"
      >
        <div class="cell-content" tabindex="0">
          {{ row[column.field] }}
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <div v-if="contextMenuVisible" class="context-menu" :style="{top: contextMenuTop + 'px', left: contextMenuLeft + 'px'}">
    <div class="menu-item" @click="copyCells">Copy</div>
    <div class="menu-item" @click="pasteCells">Paste</div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      isDragging: false,
      selectedCells: [],
      startRow: null,
      startCol: null,
      endRow: null,
      endCol: null,
      contextMenuVisible: false,
      contextMenuTop: 0,
      contextMenuLeft: 0
    }
  },
  methods:{
    handleMouseDown(row,col){
      // Set the isDragging flag to true
      this.isDragging = true;
      console.log('down',row,col)

      // Set the startRow, startCol, endRow and endCol properties
      this.startRow = row;
      this.startCol = col;
      this.endRow = row;
      this.endCol = col;

      // Add the clicked cell to the selectedCells array
      // this.selectedCells.push({ row, col });
    },
    handleMouseMove(row,col){
      if (this.isDragging) {
        // Update the endRow and endCol properties
        this.endRow = row;
        this.endCol = col;

        // Clear the selectedCells array
        this.selectedCells = [];

        // Calculate the range of cells that should be selected
        for (var i = Math.min(this.startRow, this.endRow); i <= Math.max(this.startRow, this.endRow); i++) {
          for (var j = Math.min(this.startCol, this.endCol); j <= Math.max(this.startCol, this.endCol); j++) {
            this.selectedCells.push({ row: i, col: j });
          }
        }
      }
    },
    handleMouseUp(){
      // Set the isDragging flag to false
      this.isDragging = false;

      // Reset the startRow, startCol, endRow and endCol properties
      this.startRow = null;
      this.startCol = null;
      this.endRow = null;
      this.endCol = null;
    },
    isSelected(row, col) {
      // Check if the specified cell is selected
      return this.selectedCells.some(function(cell) {
        return cell.row === row && cell.col === col;
      });
    },
    handleClick(){
      this.selectedCells = []
      this.contextMenuVisible = false
    },
    handleContextMenu(event){
      this.contextMenuVisible = true;

      // 获取鼠标点击的位置
      const x = event.clientX;
      const y = event.clientY;
      console.log(x,y)
      // 获取点击的元素
      // const target = event.target;

      // 计算菜单的位置
      // const rect = target.getBoundingClientRect();
      this.contextMenuTop = y ;
      this.contextMenuLeft = x ;
      console.log(this.contextMenuTop,this.contextMenuLeft)
      // 阻止默认的右键菜单
      event.preventDefault();
    },
    copyCells() {
      console.log('copy')
      // if (event.ctrlKey && event.keyCode === 86) {
      //   console.log('Ctrl+V pressed!');
      // }
      this.contextMenuVisible = false
      // 复制所选中的单元格
      // ...
    },
    handleKeyDown(event){
      console.log('copy')
      if (event.ctrlKey && event.keyCode === 86) {
        console.log('Ctrl+V pressed!');
      }
    },
    pasteCells() {
      console.log('paste')
      this.contextMenuVisible = false
      // 粘贴到所选中的单元格
      // ...
    },
  }
}
</script>

<style scoped>
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 10px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,th {
  padding: 0;
}

.pure-table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #cbcbcb;
}

.pure-table caption {
  color: #000;
  font: italic 85%/1 arial,sans-serif;
  padding: 1em 0;
  text-align: center;
}

.pure-table td,.pure-table th {
  border-left: 1px solid #cbcbcb;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  padding: .5em 1em;
}

.pure-table thead {
  background-color: #e0e0e0;
  color: #000;
  text-align: left;
  vertical-align: bottom;
}

.pure-table td {
  background-color: transparent;
}

.pure-table-bordered td {
  border-bottom: 1px solid #cbcbcb;
}

.pure-table-bordered tbody>tr:last-child>td {
  border-bottom-width: 0;
}

.selected{
  background-color: beige!important;
}
.cell-content {
  user-select: auto;
}
.context-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
}

.menu-item {
  padding: 4px 8px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #ccc;
}



</style>
