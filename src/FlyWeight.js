import { ref } from "vue";

class Factory {
  constructor(newRef, isRef) {
    if (isRef) this.newRef = ref(newRef);
    else {
      this.newRef = newRef;
    }
  }
}

class FlyweightFactory {
  constructor() {
    this.flyweights = new Map();
  }
  // 转换成数组形式
  convertKey(state) {
    const arrayTemp = [];
    arrayTemp.push(state);
    return arrayTemp;
  }
  useFlyweight(key, sharedState) {
    if (!this.flyweights.has(key)) {
      const newFactory = new Factory(sharedState, true);
      console.log(newFactory);
      this.flyweights.set(key, newFactory.newRef);
    }
    return this.flyweights.get(key);
  }

  getFlyweight(sharedState) {
    const key = `${sharedState}_key`;
    // const value = this.convertKey(sharedState);
    // console.log(value);
    return this.useFlyweight(key, sharedState);
  }
}
const newFactory = new FlyweightFactory();
export default newFactory;
// 另一种尝试
