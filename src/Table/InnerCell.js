import {h,inject} from "vue";



export default {
    props:['slot','row','col','content'],
    setup(props) {
        const a =  inject('allowEdit')
        const selectedCells = inject('selectedCells')
        const changeSpan = inject('changeSpan')
        const isSelected = (row, col,selectedCells) =>{
            return selectedCells.some(function(cell) {
                return cell.row === row && cell.col === col;
            });
        }
        return () => [
            h('div',{
                class:[{selected:isSelected(props.row, props.col,selectedCells)},'divSelect'],

                onClick(){
                    console.log(changeSpan,props.row,props.col)
                }
            },[
                // eslint-disable-next-line no-constant-condition
                !a.get(`${props.row}${props.col}`) ? h('span', {
                }, changeSpan.has(`${props.row}${props.col}`) ? changeSpan.get(`${props.row}${props.col}`) : props.content) : props.slot.input(),
            ])
        ]
    }
}
