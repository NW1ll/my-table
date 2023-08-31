// 享元模式的原理是将对象的属性划分为内部状态与内部状态
// 外部状态是可以隔离和改变的，剥离了外部状态的对象成为共享对象，从而减少了系统中对象的数量
// 还有典型的应用是对象池
// 一个上传对象的例子

// 真实的共享对象，内部状态只有type
class Cell {
  constructor(sharedValue) {
    this.filed = sharedValue;
    // console.log("生成:" + sharedValue);
  }
}

// 生产共享对象的工厂
class CellFactory {
  constructor() {
    this.createdFlyweightObjs = {};
  }
  // 创建对象
  create(sharedValue) {
    if (this.createdFlyweightObjs[sharedValue]) {
      return this.createdFlyweightObjs[sharedValue];
    }
    // 创建的cell是关键
    return (this.createdFlyweightObjs[sharedValue] = new Cell(sharedValue));
  }
}
export const cellFactory = new CellFactory();
