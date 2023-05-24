import { h } from 'vue'
import innerCell from "@/Table/InnerCell";

// const selectedCells = [];
// eslint-disable-next-line no-unused-vars
let isDragging = false;
// eslint-disable-next-line no-unused-vars
let startRow = null;
// eslint-disable-next-line no-unused-vars
let startCol = null;
// eslint-disable-next-line no-unused-vars
let endRow = null;
// eslint-disable-next-line no-unused-vars
let endCol = null;
// eslint-disable-next-line no-unused-vars
let divDragging = false;
let select = [];
let changed = []
let handleClick = function (rowIndex,columnIndex,allowEdit){
    if(!allowEdit.has(`${rowIndex}${columnIndex}`)){
        allowEdit.clear()
    }
}
let handleMousedown = function (row,col,selectedCells){
    // console.log('down')
    if(event.button === 0){
        // if(event.target.localName === 'div'){
        //     divDragging = true
        // }
        isDragging = true;
        console.log('zuo')
        // Set the startRow, startCol, endRow and endCol properties
        startRow = row;
        startCol = col;
        endRow = row;
        endCol = col;
        select.splice(0,select.length)
        selectedCells.splice(0,selectedCells.length)
        // Add the clicked cell to the selectedCells array
        selectedCells.push({ row, col });
        select.push({ row, col })
        console.log(select,selectedCells)
    }
}


const handleDbclick = (rowIndex,colIndex,allowEdit)=>{
    if(!allowEdit.get({rowIndex,colIndex})){
        allowEdit.set(`${rowIndex}${colIndex}`,true)
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
const MouseMove = (row,col,selectedCells,props,span)=>{
    if (isDragging && divDragging) {
        endRow = row;
        endCol = col;
        // Clear the selectedCells array
        selectedCells.splice(0,selectedCells.length)
        // changed.splice(0,changed.length)
        let firstRow,firstCol,value,Len;
        // Calculate the range of cells that should be selected
        for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); i++) {
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
            // console.log(firstRow + i)
            span.set(`${firstRow + i}${col}`,value)
            // eslint-disable-next-line vue/no-mutating-props
        }
    }else if (isDragging) {
        console.log('22')
        // Update the endRow and endCol properties
        endRow = row;
        endCol = col;
        // Clear the selectedCells array
        selectedCells.splice(0,selectedCells.length)
        // Calculate the range of cells that should be selected
        for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); i++) {
            for (let j = Math.min(startCol, endCol); j <= Math.max(startCol, endCol); j++) {
                selectedCells.push({ row: i, col: j });
            }
        }
    }

}
const handleMousemove = throttled(MouseMove,200)

const handleMouseup = () =>{
    divDragging = false
    isDragging = false;
    startRow = null;
    startCol = null;
    endRow = null;
    endCol = null;
}


export class InputCell {
    constructor(content,slots,props) {
        this.content = content
        this.slots = slots
        this.props= props
    }
    render(rowIndex,columnIndex,allowEdit,selectedCells,changeSpan){
        return h('td', {
            class:['tdSelect'],
            onDblclick:()=>handleDbclick(rowIndex,columnIndex,allowEdit),
            onClick:()=>handleClick(rowIndex,columnIndex,allowEdit),
            onMousedown:()=>handleMousedown(rowIndex,columnIndex,selectedCells),
            onMousemove:()=>handleMousemove(rowIndex,columnIndex,selectedCells,this.props,changeSpan),
            onMouseup:()=>handleMouseup(),
        },[h(innerCell,{slot:this.slots,row:rowIndex,col:columnIndex,content:this.content})])
    }
//或者事件写在插槽内部，后续比较性能
}

export class SelectCell {
    constructor(row,column,content,slots) {
        this.content = content
        this.slots = slots
        this.sharedCell = h('td', {
            onClick: handleClick,
            onMousedown:handleMousedown,
        },[
            this.slots ? this.slots.select({row:this.content}) :h('span',this.content)
        ])
    }
    render(){
        return h('span','111')
    }
}



