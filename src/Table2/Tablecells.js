import { h } from 'vue'
import cell from './cell'

// export  class TableCell {
//     constructor(row, column,content) {
//         this.row = row
//         this.column = column
//         this.content = content
//         this.sharedCell = h('td', {
//         }, this.content)
//     }
//
//     // setContent(content) {
//     //     this.content = content
//     // }
//     // render() {
//     //     return h('td', {}, this.content)
//     // }
// }


export  class TableCell {
    constructor(content) {
        this.content = content
    }
    render() {
        return h('td',{},[
            h(cell,{}) //性能损耗太大
        ])
    }
}
