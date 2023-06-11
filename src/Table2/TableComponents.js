import {h, reactive, ref,toRefs} from 'vue'
import {FlyweightFactory} from "@/FlyWeight";
import  './index.css'
export default {
    name: 'TableComponent',
    props: {
        columns: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        colTypes:{
            type:Array,
            required:false
        }
    },
    setup(props,{slots}){
        const factory = new FlyweightFactory();
        let isDragging = ref(false);
        let startRow = ref(null);
        let startCol = ref(null);
        let endRow = ref(null);
        let endCol = ref(null);
        let contextMenuVisible = ref(false);
        // let contextMenuTop = ref(0);
        // let contextMenuLeft = ref(0);
        let select = reactive([])
        let copyData = reactive([])
        let selectedCells = reactive([])
        let divDragging = ref(false)
        let changed = reactive([])
        let allowEdit= reactive(new Map);
        let T = toRefs(props.colTypes)
        const len = T.length;



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

        // const handleContextMenu = (event) =>{
        //     contextMenuVisible.value = true;
        //
        //     // 获取鼠标点击的位置
        //     const x = event.clientX;
        //     const y = event.clientY;
        //     console.log(x,y)
        //     // 获取点击的元素
        //     // const target = event.target;
        //
        //     // 计算菜单的位置
        //     // const rect = target.getBoundingClientRect();
        //     contextMenuTop.value = y ;
        //     contextMenuLeft.value = x ;
        //     // 阻止默认的右键菜单
        //     event.preventDefault();
        // }
        // const copyCells = ()=> {
        //     let initRow = selectedCells[0].row,initCol = selectedCells[0].col;
        //     let len = selectedCells.length;
        //     let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
        //     console.log(width,len)
        //     let copydata = new Array(width).fill('').map(()=> new Array(Math .floor(len/width) ).fill(''))
        //     selectedCells.forEach((item) =>{
        //         let rowIndex = item.row;
        //         let colIndex = item.col;
        //         copydata[rowIndex - initRow][colIndex - initCol] = props.rows[rowIndex][props.columns[colIndex].field]
        //     })
        //     copyData = copydata
        //
        //     contextMenuVisible.value = false
        //     // 复制所选中的单元格
        //     // ...
        // }
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
                        props.rows[i + rowIndex][props.columns[j + colIndex].field] = copyData[i][j]
                        selectedCells.push({ row: i + rowIndex, col: j + colIndex});
                    }
                }
            }
        }

        // const pasteCells = () =>{
        //     let rowIndex = selectedCells[0].row,colIndex = selectedCells[0].col;
        //     for(let i = 0 ; i < copyData.length; i++){
        //         for(let j = 0; j < copyData[0].length;j++){
        //             // eslint-disable-next-line vue/no-mutating-props
        //             props.rows[i + rowIndex][props.columns[j + colIndex].field] = copyData[i][j]
        //             selectedCells.push({ row: i + rowIndex, col: j + colIndex});
        //         }
        //     }
        // }
        //
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

        // const getCell = (content) =>{
        //     let val = cellCache.get(JSON.stringify(content))
        //     if(!val){
        //         val = content
        //         cellCache.set(JSON.stringify(content),val)
        //         console.log('new value')
        //     }
        //     return val
        // }

        const headers = props.columns.map(column => {
            return h('th', column.title)
        })

        return () => h('div',{
            tabindex:'-1',
            onKeydown:handleKeyDown,
            style:{
                outline:'none'
            }
        },[h('table', {class : ['pure-table' ,'pure-table-bordered']}, [
            h('thead', {}, [h('tr', headers)]),
            h('tbody', {}, [
                props.rows.map((row,rowIndex) => {
                    return h('tr',{},[
                        props.columns.map((col,colIndex) => {
                            if(0 < len && col.type === T[0].value){
                                let type = T[0].value
                                return h('td',{
                                    class:[{selected:isSelected(rowIndex, colIndex)},'divSelect'],
                                    onDblclick:()=>handleDbclick(rowIndex,colIndex),
                                    onClick:()=>handleClick(rowIndex,colIndex),
                                    onMousedown:()=>handleMouseDown(rowIndex,colIndex),
                                    onMousemove:()=>handleMouseMove(rowIndex,colIndex),
                                    onMouseup:()=>handleMouseUp(),
                                },[
                                    allowEdit.get(`${rowIndex}${colIndex}`) && slots[type] ? slots[type]({
                                        row:row
                                    }) : factory.getFlyweight(row[col.field]),
                                    h('div',{
                                        class:{selectedOne : isSelectedOne(rowIndex, colIndex)},
                                        onMousedown:()=>handleMouseDown(rowIndex,colIndex),
                                    }),
                                    h('div',{
                                        class:{selectedChange: isChanged(rowIndex, colIndex)}
                                    })
                                ])
                            }else {
                                return h('td',{},[
                                    factory.getFlyweight(row[col.field])
                                ])
                            }
                        })
                    ])
                })
            ])//尝试添加式
        ])])
    }
}//动态问题


