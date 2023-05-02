import {TableCell} from './TableCell.js'
import { h } from 'vue'
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
    data() {
        return {
            cellCache: new Map()
        }
    },
    methods: {
        getCell(row, column) {
            const key = `${row[column]}_key`
            // let cell = this.cellCache.get(key)
            // if (!cell) {
            //     cell = new TableCell(row, column)
            //     this.cellCache.set(key, cell)
            // }
            let cell = this.cellCache.get(key)
            if(!this.cellCache.get(key)){
                cell = new TableCell(row,column,row[column])
                this.cellCache.set(key,cell)
                console.log('创建的单元格数目为重复次数')
            }
            return cell
        }
    },
    render() {
        const headers = this.columns.map(column => {
            return h('th', column.title)
        })
        const rows = this.rows.map(row => {
            const cells = this.columns.map(column => {
                const cell = this.getCell(row, column.field)
                // if (!cell.content) {
                //     cell.setContent(row[column.field])
                // }
                // return cell.render(h)
                return cell.sharedCell
            })
            return h('tr', cells)
        })
        return h('table', {class : ['pure-table' ,'pure-table-bordered']}, [
            h('thead', {}, [h('tr', headers)]),
            h('tbody', {}, rows)
        ])
    }
}
