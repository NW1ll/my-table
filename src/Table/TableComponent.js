import {InputCell,SelectCell} from './TableCell.js'
import {h, reactive,provide} from 'vue'
import  './index.css'
// import innerCell from "@/Table/InnerCell";
// import innerCell from "@/Table/InnerCell";
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
        }
    },
    setup(props,{slots}){
        const cellCache = reactive(new Map());
        const allowEdit = reactive(new Map());
        const changeSpan = reactive(new Map())
        const selectedCells = reactive([]);
        let copyData = reactive([])
        provide('allowEdit',allowEdit)
        provide('selectedCells',selectedCells)
        provide('changeSpan',changeSpan)
        const handleKeyDown = () =>{
            console.log('keydown')
            if (event.ctrlKey && event.key === 'c') {
                let initRow = selectedCells[0].row,initCol = selectedCells[0].col;
                let len = selectedCells.length;
                let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
                let copydata = new Array(width).fill('').map(()=> new Array(Math .floor(len/width) ).fill(''))
                selectedCells.forEach((item) =>{
                    let rowIndex = item.row;
                    let colIndex = item.col;
                    copydata[rowIndex - initRow][colIndex - initCol] = props.rows[rowIndex][props.columns[colIndex].field]
                })
                copyData = copydata
            }else if(event.ctrlKey && event.key === 'v'){
                let rowIndex = selectedCells[0].row,colIndex = selectedCells[0].col;
                for(let i = 0 ; i < copyData.length; i++){
                    for(let j = 0; j < copyData[0].length;j++){
                        // eslint-disable-next-line vue/no-mutating-props
                        // props.rows[i + rowIndex][props.columns[j + colIndex].field] = copyData[i][j]
                        changeSpan.set(`${i + rowIndex}${j + colIndex}`,copyData[i][j])
                        selectedCells.push({ row: i + rowIndex, col: j + colIndex});
                    }
                }
            }
        }

        const render = (rowIndex,columnIndex,content) =>{
            return h('td', {
                class:['tdSelect'],

            },[h(innerCell,{row:rowIndex,col:columnIndex,content:content})])
        }


        const getCell = (row, column,colType,rowIndex,columnIndex) =>{
            const key = `${row[column]}_key`
            let cell = cellCache.get(key)
            if(!cellCache.get(key)){
                if(colType === 'input'){
                    cell = new InputCell(row[column],slots,rowIndex,columnIndex)
                    console.log('创建新的单元格')
                }
                else if(colType === 'select') {
                    cell = new SelectCell(row[column],slots,rowIndex,columnIndex)
                }
                cellCache.set(key,cell)
            }
            return cell
        }
        const headers = props.columns.map(column => {
            return h('th', column.title)
        })
        const rows = props.rows.map((row,rowIndex) => {
            const cells = props.columns.map((column,columnIndex) => {
                const cell = getCell(row,column.field,column.type,rowIndex,columnIndex)
                return cell.render(rowIndex,columnIndex) //渲染td
                // return render(rowIndex,columnIndex,row[column.field])
                // return cell.sharedCell
            })
            return h('tr', cells)
        })
        return () =>h('div',{
            tabindex:'-1',
            // onKeydown:handleKeyDown,
            style:{
                outline:'none'
            }
        },[h('table', {class : ['pure-table' ,'pure-table-bordered']}, [
            h('thead', {}, [h('tr', headers)]),
            h('tbody', {}, rows)//尝试添加式
        ])])
    }
}//动态问题




