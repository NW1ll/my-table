import { ref } from "vue";

class Factory {
  constructor(newRef) {
    this.newObj = newRef;
  }
}

class FlyweightFactory {
  constructor() {
    this.flyweights = new Map();
  }
  useFlyweight(key, sharedState) {
    if (!this.flyweights.has(key)) {
      // const newFactory = new Factory(sharedState);
      this.flyweights.set(key, sharedState);
    }
    return this.flyweights.get(key)[0];
  }

  getFlyweight(sharedState) {
    const key = `${sharedState}_key`;
    return this.useFlyweight(key, [sharedState]);
  }
}
const newFactory = new FlyweightFactory();
export default newFactory;
// 另一种尝试
