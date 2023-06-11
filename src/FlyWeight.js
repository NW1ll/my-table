export class Flyweight {
    constructor(sharedState) {
        this.sharedState = sharedState;
    }
     operation(uniqueState){
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
}

export class FlyweightFactory {
        constructor() {
            this.flyweights = new Map()
            // for (const state of initialFlyweights) {
            // this.flyweights[this.getKey(state)] = new Flyweight(state);
            // }
        }

        getKey(state){
            return state;
        }
        getFlyweight(sharedState){
            // const key = this.getKey(sharedState);
            let val = this.flyweights.get(JSON.stringify(sharedState))
            if (!val) {
            console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
            // this.flyweights[key] = new Flyweight(sharedState);
                this.flyweights.set(JSON.stringify(sharedState),sharedState)
                val = sharedState
            }
            // console.log(this.flyweights)
            return val;
        }

        // listFlyweights() {
        //     const count = Object.keys(this.flyweights).length;
        //     console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        //     for (const key in this.flyweights) {
        //     console.log(key);
        //     }
        // }
}


