import {InputCell,SelectCell} from './TableCell.js'
import {h, provide, reactive, ref} from 'vue'
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

        let T = ref(false)
        const handleKeyDown = () =>{
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
                        // props.rows[i + rowIndex][props.columns[j + colIndex].field] = copyData[i][j]
                        changeSpan.set(`${i + rowIndex}${j + colIndex}`,copyData[i][j])
                        selectedCells.push({ row: i + rowIndex, col: j + colIndex});
                    }
                }
            }
        }

        const getCell = (row, column,colType,props) =>{
            const key = `${row[column]}_key`
            let cell = cellCache.get(key)
            if(!cellCache.get(key)){
                if(colType === 'input'){
                    cell = new InputCell(row[column],slots,props)
                }
                else if(colType === 'select') {
                    cell = new SelectCell(row[column],slots)
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
                const cell = getCell(row,column.field,column.type,props)

                return  cell.render(rowIndex,columnIndex,allowEdit,selectedCells,changeSpan) //渲染td
            })
            return h('tr', cells)
        })
        return () =>h('div',{
            tabindex:'-1',
            onKeydown:handleKeyDown,
            style:{
                outline:'none'
            }
        },[h('table', {class : ['pure-table' ,'pure-table-bordered']}, [
            h('thead', {}, [h('tr', headers)]),
            h('tbody', {}, rows)
        ]),
            h('button',{
                onclick(){
                    props.rows[0].id = '1111'
                    T.value = ! T.value
                    console.log(props)
                }},'按钮')
        ])
    }
}//动态问题

// import {TableCell} from './TableCell.js'
// import { h } from 'vue'
// import  './index.css'
// export default {
//     name: 'TableComponent',
//     props: {
//         columns: {
//             type: Array,
//             required: true
//         },
//         rows: {
//             type: Array,
//             required: true
//         }
//     },
//     data() {
//         return {
//             cellCache: new Map()
//         }
//     },
//     methods: {
//         getCell(row, column) {
//             const key = `${row[column]}_key`
//             // let cell = this.cellCache.get(key)
//             // if (!cell) {
//             //     cell = new TableCell(row, column)
//             //     this.cellCache.set(key, cell)
//             // }
//             let cell = this.cellCache.get(key)
//             if(!this.cellCache.get(key)){
//                 cell = new TableCell(row,column,row[column])
//                 this.cellCache.set(key,cell)
//                 console.log('创建的单元格数目为重复次数')
//             }//单元格类型
//             return cell
//         }
//     },
//     render() {
//         const headers = this.columns.map(column => {
//             return h('th', column.title)
//         })
//         const rows = this.rows.map(row => {
//             const cells = this.columns.map(column => {
//                 const cell = this.getCell(row, column.field)
//                 // if (!cell.content) {
//                 //     cell.setContent(row[column.field])
//                 // }
//                 // return cell.render(h)
//                 return cell.sharedCell
//             })
//             return h('tr', cells)
//         })
//         return h('table', {class : ['pure-table' ,'pure-table-bordered']}, [
//             h('thead', {}, [h('tr', headers)]),
//             h('tbody', {}, rows)
//         ])
//     }
// }


