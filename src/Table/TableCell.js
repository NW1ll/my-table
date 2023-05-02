import { h } from 'vue'

let handleClick = function (){
    console.log('click')
}
let handleMousedown = function (){
    console.log('down')
}


export  class TableCell {
    constructor(row, column,content) {
        this.row = row
        this.column = column
        this.content = content
        this.sharedCell = h('td', {
            onClick: handleClick,
            onMousedown:handleMousedown,
            }, this.content)
    }

    // setContent(content) {
    //     this.content = content
    // }
    // render() {
    //     console.log('11')
    //     return h('td', {}, this.content)
    // }
}
