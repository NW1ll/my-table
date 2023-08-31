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
}

const r1 = { name: "东京之旅", age: "st" };
const r2 = { name: "东京之旅", age: "st" };
const r3 = { name: "东京之旅", age: "st" };
const r4 = { name: "东京之旅", age: "st" };
const r5 = { name: "东京之旅", age: "st" };
const r6 = { name: "东京之旅", age: "st" };

const factory = new RowFactory();
let row1 = factory.getRow("123", "st");
const row2 = factory.getRow("123", "st");
const row3 = factory.getRow("123", "st");
const row4 = factory.getRow("123", "st");
const row5 = factory.getRow("123", "st");
const row6 = factory.getRow("123", "st");

let row11 = factory.getRow("东京之旅", "st").name;
const row22 = factory.getRow("东京之旅", "st").age;

row1.name = "东京之旅";

const obj = [row1, row2, row3, row4, row5, row6];
const obj2 = [r1, r2, r3, r4, r5, r6];
const obj3 = [row1, row1, row1, row1, row1, row1];
const obj4 = [
  { name: row11, age: row22 },
  { name: row11, age: row22 },
  { name: row11, age: row22 },
  { name: row11, age: row22 },
  { name: row11, age: row22 },
  { name: row11, age: row22 },
];
console.log(obj, obj2, obj3, obj4);
console.log(sizeof(obj), sizeof(obj2), sizeof(obj3), sizeof(obj4));
//创建的时候返回的属性

const arr = [1, 2, 3];
const arr2 = arr;
arr[0] = "qwe";
console.log(arr, arr2);
