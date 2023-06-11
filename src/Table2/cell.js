import {h} from "vue";



export default {
    setup() {

        return () => [
            h('div',{

                onClick(){
                }
            },[
                // eslint-disable-next-line no-constant-condition
                h('span','111')
            ])
        ]
    }
}
