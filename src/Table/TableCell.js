import { h } from 'vue'

let handleClick = function (){
    console.log('click')
}
let handleMousedown = function (){
    console.log('down')
}


export class TableCell {
    constructor(row, column,content) {
        this.row = row
        this.column = column
        this.content = content
        this.sharedCell = h('td', {
            onClick: handleClick,
            onMousedown:handleMousedown,
            }, this.content)
    }
//在其中创建一个cell
    // setContent(content) {
    //     this.content = content
    // }

}


export default {
    setup(props, { slots }) {
        // const cellCache = reactive(new Map())
        console.log(props)
        // const getCell =(row, column,cellType)=> {
        //     console.log(cellType)
        //     const key = `${row[column]}_key`
        //     // let cell = this.cellCache.get(key)
        //     // if (!cell) {
        //     //     cell = new TableCell(row, column)
        //     //     this.cellCache.set(key, cell)
        //     // }
        //     let cell = cellCache.get(key)
        //     if(!cellCache.get(key)){
        //         cell = new TableCell(row,column,row[column])
        //         cellCache.set(key,cell)
        //         console.log('创建的单元格数目为重复次数')
        //     }
        //     return cell
        // }
        return () => [
            slots.default ? h('div', slots.default()) : h('span','111')
            // 默认插槽：
            // <div><slot /></div>
            // h('div', slots.default()),

            // 具名插槽：
            // <div><slot name="footer" :text="message" /></div>
            // h(
            //     'div',
            //     slots.footer({
            //         text: props.message
            //     })
            // )
        ]
    }
}
