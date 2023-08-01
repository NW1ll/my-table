let sizeof = require("object-sizeof");

class RowFactory {
  constructor() {
    this.circleCache = {};
  }

  getRow(name, age) {
    const key = name + age;
    if (!this.circleCache[key]) {
      this.circleCache[key] = new Circle(name, age);
    }
    return this.circleCache[key];
  }
}

// 具体的享元类
class Circle {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  draw(x, y) {
    console.log(`${this.name}`);
  }
}

// const r1 = { name: "东京之旅", age: "st" };
// const r2 = { name: "东京之旅", age: "st" };
// const r3 = { name: "东京之旅", age: "st" };
// const r4 = { name: "东京之旅", age: "st" };
// const r5 = { name: "东京之旅", age: "st" };
// const r6 = { name: "东京之旅", age: "st" };

const factory = new RowFactory();
let row1 = factory.getRow("123", "st");
const row2 = factory.getRow("123", "st");
const row3 = factory.getRow("123", "st");
const row4 = factory.getRow("123", "st");
const row5 = factory.getRow("123", "st");
const row6 = factory.getRow("123", "st");

row1.name = "东京之旅";
const obj = [row1, row2, row3, row4, row5, row6];
// const obj2 = [r1, r2, r3, r4, r5, r6];
// const obj2 = [row1, row1, row1, row1, row1, row1, row1, row1, row1];
console.log(obj, row1);
console.log(sizeof(obj), sizeof(row1));
//创建的时候返回的属性
