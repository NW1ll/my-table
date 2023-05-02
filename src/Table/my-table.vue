<template>
  <button @click="changeEdit">{{ editable ? '退出编辑' : '进入编辑' }}</button>
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
          style="user-select: none"
          @mousedown="handleMouseDown(rowIndex, colIndex,column.field)"
          @mousemove="handleMouseMove(rowIndex, colIndex,column.field)"
          @mouseup="handleMouseUp"
          @click="handleClick"
          @keydown="handleKeyDown"
          @paste="pasteCells"
      >
        <span v-if="editable" class="cell-content" >
          {{ row[column.field] }}
        </span>
        <input v-else type="text" v-model="row[column.field]">
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
      editable:true,
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
    changeEdit(){
      this.editable = !this.editable
    },
    handleMouseDown(row,col){

      if(event.button === 0){
        this.isDragging = true;
        console.log('zuo')
        // Set the startRow, startCol, endRow and endCol properties
        this.startRow = row;
        this.startCol = col;
        this.endRow = row;
        this.endCol = col;
        this.selectedCells = []
        // Add the clicked cell to the selectedCells array
        // this.selectedCells.push({ row, col });
      }

    },
    handleMouseMove(row,col){
      if (this.isDragging) {
        // Update the endRow and endCol properties
        this.endRow = row;
        this.endCol = col;

        // Clear the selectedCells array
        this.selectedCells = [];
        // Calculate the range of cells that should be selected
        for (let i = Math.min(this.startRow, this.endRow); i <= Math.max(this.startRow, this.endRow); i++) {
          for (let j = Math.min(this.startCol, this.endCol); j <= Math.max(this.startCol, this.endCol); j++) {
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
      let initRow = this.selectedCells[0].row,initCol = this.selectedCells[0].col;
      let len = this.selectedCells.length;
      let width = this.selectedCells[len - 1].row - this.selectedCells[0].row + 1;
      let copyData = new Array(width).fill('').map(()=> new Array(Math .floor(len/width) ).fill(''))
      this.selectedCells.forEach((item) =>{
        let rowIndex = item.row;
        let colIndex = item.col;
        copyData[rowIndex - initRow][colIndex - initCol] = this.rows[rowIndex][this.columns[colIndex].field]
        console.log(copyData)
      })
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
