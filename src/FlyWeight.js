export class Flyweight {
    constructor(sharedState) {
        this.sharedState = sharedState;
    }
}


export class FlyweightFactory {
        constructor() {
            this.flyweights = {};
            // for (const state of initialFlyweights) {
            // this.flyweights[this.getKey(state)] = new Flyweight(state);
            // }
        }

        getKey(state){
            return JSON.stringify(state)
        }
        getFlyweight(sharedState){
            const key = this.getKey(sharedState);
            if(!(key in this.flyweights)){
                this.flyweights[key] = new Flyweight(sharedState);
            }
            return this.flyweights[key].sharedState;
        }
}


