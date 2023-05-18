<template>
  <div @keydown="handleKeyDown" tabindex="-1"  style="outline: none;" >
    <table class="pure-table pure-table-bordered" @contextmenu.prevent="handleContextMenu" >
      <thead>
      <tr>
        <th v-for="column in columns" :key="column.field">{{ column.title }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row,rowIndex) in rows" :key="row.id">
        <td v-for="(column,colIndex) in columns" :key="column.field"
            :class="{ selected: isSelected(rowIndex, colIndex)}"
            style="user-select: none;position: relative"
            @mousedown="handleMouseDown(rowIndex, colIndex)"
            @mousemove="handleMouseMove(rowIndex, colIndex)"
            @mouseup="handleMouseUp"
            @click="handleClick(rowIndex, colIndex)"
            @dblclick="handleDbclick(rowIndex, colIndex)"
        >
          <slot v-if="allowEdit.get(`${rowIndex}${colIndex}`) && $slots.default"></slot>
          <span v-else class="cell-content">
          {{ row[column.field] }}
          </span>
          <div>
            <div @mousedown="handleMouseDown" :class="{selectedOne : isSelectedOne(rowIndex, colIndex)}"></div>
            <div :class="{selectedChange: isChanged(rowIndex, colIndex)}"></div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="contextMenuVisible" class="context-menu" :style="{top: contextMenuTop + 'px', left: contextMenuLeft + 'px'}">
      <div class="menu-item" @click="copyCells">Copy</div>
      <div class="menu-item" @click="pasteCells">Paste</div>
    </div>
  </div>
</template>


<script setup>
import {ref, reactive, defineProps} from "vue";
// import * as buffer from "buffer";
//插槽与col对应
const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})
let isDragging = ref(false);
let startRow = ref(null);
let startCol = ref(null);
let endRow = ref(null);
let endCol = ref(null);
let contextMenuVisible = ref(false);
let contextMenuTop = ref(0);
let contextMenuLeft = ref(0);
let select = reactive([])
let copyData = reactive([])
let selectedCells = reactive([])
let divDragging = ref(false)
let changed = reactive([])
let allowEdit= reactive(new Map)


const handleMouseDown = (row,col)=>{
  if(event.button === 0){
    if(event.target.localName === 'div'){
      divDragging.value = true
    }
    isDragging.value = true;
    console.log('zuo')
    // Set the startRow, startCol, endRow and endCol properties
    startRow.value = row;
    startCol.value = col;
    endRow.value = row;
    endCol.value = col;
    select.splice(0,select.length)
    selectedCells.splice(0,selectedCells.length)
    // Add the clicked cell to the selectedCells array
    selectedCells.push({ row, col });
    select.push({ row, col })
  }
}
function throttled(fn, delay = 500) {
  let oldtime = Date.now()
  return function (...args) {
    let newtime = Date.now()
    if (newtime - oldtime >= delay) {
      fn.apply(null, args)
      oldtime = Date.now()
    }
  }
}
const MouseMove = (row,col) =>{
  if (isDragging.value && divDragging.value) {
    endRow.value = row;
    endCol.value = col;
    // Clear the selectedCells array
    selectedCells.splice(0,selectedCells.length)
    // changed.splice(0,changed.length)
    let firstRow,firstCol,value,Len;
    // Calculate the range of cells that should be selected
    for (let i = Math.min(startRow.value, endRow.value); i <= Math.max(startRow.value, endRow.value); i++) {
      selectedCells.push({ row: i, col: col });
      firstRow = selectedCells[0].row;
      firstCol = selectedCells[0].col
      Len = selectedCells.length;
      value = props.rows[firstRow][props.columns[firstCol].field]
    }
    for(let i = 0; i < Len; i++){
      if(props.rows[firstRow + i][props.columns[firstCol].field] !== value){
          let row = firstRow + i;
          let col = firstCol;
          changed.push({row,col})
      }
      // eslint-disable-next-line vue/no-mutating-props
      props.rows[firstRow + i][props.columns[firstCol].field] = value
    }
    console.log(changed)
  }else if (isDragging.value) {
    // Update the endRow and endCol properties
    endRow.value = row;
    endCol.value = col;
    // Clear the selectedCells array
    selectedCells.splice(0,selectedCells.length)
    // Calculate the range of cells that should be selected
    for (let i = Math.min(startRow.value, endRow.value); i <= Math.max(startRow.value, endRow.value); i++) {
      for (let j = Math.min(startCol.value, endCol.value); j <= Math.max(startCol.value, endCol.value); j++) {
        selectedCells.push({ row: i, col: j });
      }
    }
  }
}
const handleMouseMove = throttled(MouseMove,100)


const handleMouseUp = () =>{
  divDragging.value = false
  isDragging.value = false;
  startRow.value = null;
  startCol.value = null;
  endRow.value = null;
  endCol.value = null;
}

const isSelected = (row, col) => {
  return selectedCells.some(function(cell) {
    return cell.row === row && cell.col === col;
  });
}

const handleClick = (rowIndex,colIndex) => {
  contextMenuVisible.value = false;
  if(!allowEdit.has(`${rowIndex}${colIndex}`)){
    allowEdit.clear()
  }
  //作用域插槽，传值
}

const handleDbclick = (rowIndex,colIndex) =>{
  if(!allowEdit.get({rowIndex,colIndex})){
    allowEdit.set(`${rowIndex}${colIndex}`,true)
  }
}

const handleContextMenu = (event) =>{
  contextMenuVisible.value = true;

  // 获取鼠标点击的位置
  const x = event.clientX;
  const y = event.clientY;
  console.log(x,y)
  // 获取点击的元素
  // const target = event.target;

  // 计算菜单的位置
  // const rect = target.getBoundingClientRect();
  contextMenuTop.value = y ;
  contextMenuLeft.value = x ;
  // 阻止默认的右键菜单
  event.preventDefault();
}
const copyCells = ()=> {
  let initRow = selectedCells[0].row,initCol = selectedCells[0].col;
  let len = selectedCells.length;
  let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
  console.log(width,len)
  let copydata = new Array(width).fill('').map(()=> new Array(Math .floor(len/width) ).fill(''))
  selectedCells.forEach((item) =>{
    let rowIndex = item.row;
    let colIndex = item.col;
    copydata[rowIndex - initRow][colIndex - initCol] = props.rows[rowIndex][props.columns[colIndex].field]
  })
  copyData = copydata

  contextMenuVisible.value = false
  // 复制所选中的单元格
  // ...
}
const handleKeyDown =(event) =>{
  console.log('keydown')
  if (event.ctrlKey && event.key === 'c') {
    let initRow = selectedCells[0].row,initCol = selectedCells[0].col;
    let len = selectedCells.length;
    let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
    console.log(width,len)
    let copydata = new Array(width).fill('').map(()=> new Array(Math .floor(len/width) ).fill(''))
    selectedCells.forEach((item) =>{
      let rowIndex = item.row;
      let colIndex = item.col;
      copydata[rowIndex - initRow][colIndex - initCol] = props.rows[rowIndex][props.columns[colIndex].field]
    })
    copyData = copydata
    console.log(copyData)
  }else if(event.ctrlKey && event.key === 'v'){
    let rowIndex = selectedCells[0].row,colIndex = selectedCells[0].col;
    for(let i = 0 ; i < copyData.length; i++){
      for(let j = 0; j < copyData[0].length;j++){
        // eslint-disable-next-line vue/no-mutating-props
        props.rows[i + rowIndex][props.columns[j + colIndex].field] = copyData[i][j]
        selectedCells.push({ row: i + rowIndex, col: j + colIndex});
      }
    }
  }
}

const pasteCells = () =>{
  let rowIndex = selectedCells[0].row,colIndex = selectedCells[0].col;
  for(let i = 0 ; i < copyData.length; i++){
    for(let j = 0; j < copyData[0].length;j++){
      // eslint-disable-next-line vue/no-mutating-props
      props.rows[i + rowIndex][props.columns[j + colIndex].field] = copyData[i][j]
      selectedCells.push({ row: i + rowIndex, col: j + colIndex});
    }
  }
}

const isSelectedOne = (row, col) => {
  return select.some(function(cell) {
    return cell.row === row && cell.col === col;
  });
}
const isChanged = (row, col)=>{
  return changed.some(function(cell) {
    return cell.row === row && cell.col === col;
  });
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


.selectedOne{
  width: 7px;
  height: 7px;
  background-color: aqua ;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: crosshair
}

.selectedChange{
  width: 7px;
  height: 7px;
  background-color: red ;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
