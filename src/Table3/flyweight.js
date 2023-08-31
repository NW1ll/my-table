// 享元模式的原理是将对象的属性划分为内部状态与内部状态
// 外部状态是可以隔离和改变的，剥离了外部状态的对象成为共享对象，从而减少了系统中对象的数量
// 还有典型的应用是对象池
// 一个上传对象的例子

// 真实的共享对象，内部状态只有type
class Cell {
  constructor(sharedValue) {
    this.filed = sharedValue;
    console.log("生成:" + sharedValue);
    this.reset();
  }
  reset() {}
  doUpload() {
    console.log("开始上传" + this.filed);
    this.reset();
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
    return (this.createdFlyweightObjs[sharedValue] = new Cell(sharedValue));
  }
}
const cellFactory = new CellFactory();
// 共享对象外部状态管理中心
class CellManager {
  constructor() {
    this.CellDatas = [];
  }
  // 记录对象的外部状态
  add(filed, row, col) {
    this.CellDatas.push({
      filed,
      row,
      col,
    });
  }
}
const cellManager = new CellManager();
cellManager.add("a", 0, 0);
cellManager.add("b", 0, 1);
cellManager.add("c", 0, 2);
cellManager.add("b", 0, 3);
cellManager.add("b", 0, 4);

// 共享内部状态
let startUpload = function () {
  const arr = [];
  for (let i = 0; i < cellManager.CellDatas.length; i++) {
    const element = cellManager.CellDatas[i];
    let cell = cellFactory.create(element.filed);
    cell.row = element.row;
    cell.col = element.col;
    console.log(cell);
    arr.push(cell);
    // cell.doUpload();
  }
  // 对象之间仍然会相互影响
  console.log(arr);
};

startUpload();
