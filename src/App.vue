<template>
  <!--  table2中组件-->
  <TableComponent2
    :rows="newRowFy"
    :columns="columns"
    :colTypes="colTypes"
    :flyweight="true"
  >
    <template #input="{ row }">
      <vxe-select v-model="row.age" placeholder="默认尺寸">
        <vxe-option
          v-for="num in 20"
          :key="num"
          :value="num"
          :label="`${num}`"
        ></vxe-option>
      </vxe-select>
    </template>
  </TableComponent2>

  <!--  <TableComponent3-->
  <!--    :rows="res"-->
  <!--    :columns="columns"-->
  <!--    :flyweight="true"-->
  <!--    :colTypes="colTypes"-->
  <!--  ></TableComponent3>-->
</template>

<script setup>
import { reactive, ref } from "vue";

let sizeof = require("object-sizeof");
import TableComponent2 from "./Table2/TableComponent";
import TableComponent3 from "@/Table3/tableComponents";
import newFactory from "@/FlyWeight";
import { cellFactory } from "@/Flyweight2";
const LEN = 4000;
let colTypes = reactive(["input", "select"]);
let columns = reactive([
  { field: "id", title: "ID", type: "input" },
  { field: "name", title: "Name", type: "select" },
  { field: "email", title: "Email", type: "input" },
  { field: "sex", title: "Sex", type: "select" },
  { field: "score", title: "Score", type: "input" },
  { field: "home", title: "Home", type: "select" },
  { field: "age", title: "Age", type: "input" },
  { field: "hobby", title: "Hobby", type: "select" },
  { field: "height", title: "Height", type: "input" },
  { field: "weight", title: "Weight", type: "input" },
]);
const arr1 = [];
for (let i = 0; i < LEN; i++) {
  // arr1[i] = {
  //   id: newFactory.getFlyweight([1]),
  //   name: newFactory.getFlyweight(["nw1"]),
  //   email: newFactory.getFlyweight(["janedoe@example.com"]),
  //   sex: newFactory.getFlyweight(["男"]),
  //   score: newFactory.getFlyweight([90]),
  //   home: newFactory.getFlyweight(["xxxxxxxx"]),
  //   age: newFactory.getFlyweight(["18"]),
  //   hobby: newFactory.getFlyweight(["music"]),
  //   height: newFactory.getFlyweight(["180"]),
  //   weight: newFactory.getFlyweight(["78"]),
  // };
  arr1[i] = {
    id: cellFactory.create(1).filed,
    name: cellFactory.create("nw1").filed,
    email: cellFactory.create("janedoe@example.com").filed,
    sex: cellFactory.create("男").filed,
    score: cellFactory.create(90).filed,
    home: cellFactory.create("xxxxxxxx").filed,
    age: cellFactory.create("18").filed,
    hobby: cellFactory.create("music").filed,
    height: cellFactory.create("180").filed,
    weight: cellFactory.create("78").filed,
  };
  // arr1[i] = {
  //   id: newFactory.getFlyweight(1),
  //   name: newFactory.getFlyweight("nw1"),
  //   email: newFactory.getFlyweight("janedoe@example.com"),
  //   sex: newFactory.getFlyweight("男"),
  //   score: newFactory.getFlyweight(90),
  //   home: newFactory.getFlyweight("xxxxxxxx"),
  //   age: newFactory.getFlyweight("18"),
  //   hobby: newFactory.getFlyweight("music"),
  //   height: newFactory.getFlyweight("180"),
  //   weight: newFactory.getFlyweight("78"),
  // };
}
arr1[0].id = 2;
const newRowFy = reactive(arr1);

const arr2 = new Array(LEN).fill({
  id: 1,
  name: "nw1",
  email: "janedoe@example.com",
  sex: "男",
  score: 90,
  home: "xxxxxxxx",
  age: "18",
  hobby: "music",
  height: "180",
  weight: "78",
});
let newRow = reactive(arr2);

const arr3 = [];
for (let i = 0; i < LEN; i++) {
  arr3[i] = {
    id: 1,
    name: "nw1",
    email: "janedoe@example.com",
    sex: "男",
    score: 90,
    home: "xxxxxxxx",
    age: "18",
    hobby: "music",
    height: "180",
    weight: "78",
  };
}
arr3[0].id = 333333;
// console.log(arr3);
const newRow2 = reactive(arr3);

console.log("开启享元的占用内存", sizeof(newRowFy));
console.log("未开启", sizeof(newRow));
console.log("未开启", sizeof(newRow2));
</script>
