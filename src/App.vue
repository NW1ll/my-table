<template>
  <TableComponent3 :rows="newRowFy" :columns="columns" :colTypes="colTypes">
    <template #input="{ row }">
      <vxe-select v-model="row.age">
        <vxe-option
          v-for="num in 20"
          :key="num"
          :value="num"
          :label="`${num}`"
        ></vxe-option>
      </vxe-select>
    </template>

    <template #select="{ row }">
      <vxe-select v-model="row.sex">
        <vxe-option
          v-for="num in ['男', '女']"
          :key="num"
          :value="num"
          :label="`${num}`"
        ></vxe-option>
      </vxe-select>
    </template>

    <template #input_email="{ row }">
      <vxe-input v-model="row.email"> </vxe-input>
    </template>
  </TableComponent3>
</template>

<script setup>

import { reactive, ref } from "vue";
import TableComponent3 from "@/Table3/tableComponents";
import newFactory from "@/FlyWeight";
import { cellFactory } from "@/Flyweight2";
const LEN = 200;
let colTypes = reactive(["input", "select", "input_email"]);
let columns = reactive([
  { field: "id", title: "ID", type: "input" },
  { field: "name", title: "Name", type: "select" },
  { field: "email", title: "Email", type: "input_email" },
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
  if (i % 2 === 0) {
    arr1[i] = {
      id: cellFactory.create(1).filed,
      name: cellFactory.create("nw1").filed,
      email: cellFactory.create("janedoe@example.com").filed,
      sex: cellFactory.create("男").filed,
      score: cellFactory.create(90).filed,
      home: cellFactory.create("上海").filed,
      age: cellFactory.create("18").filed,
      hobby: cellFactory.create("music").filed,
      height: cellFactory.create("180").filed,
      weight: cellFactory.create("78").filed,
    };
  } else if (i % 3 === 0) {
    arr1[i] = {
      id: cellFactory.create(2).filed,
      name: cellFactory.create("小李").filed,
      email: cellFactory.create("janedoe@example.com").filed,
      sex: cellFactory.create("女").filed,
      score: cellFactory.create(90).filed,
      home: cellFactory.create("江苏").filed,
      age: cellFactory.create("19").filed,
      hobby: cellFactory.create("dance").filed,
      height: cellFactory.create("170").filed,
      weight: cellFactory.create("50").filed,
    };
  } else {
    arr1[i] = {
      id: cellFactory.create(3).filed,
      name: cellFactory.create("小张").filed,
      email: cellFactory.create("janedoe1@example.com").filed,
      sex: cellFactory.create("男").filed,
      score: cellFactory.create(80).filed,
      home: cellFactory.create("浙江").filed,
      age: cellFactory.create("19").filed,
      hobby: cellFactory.create("篮球").filed,
      height: cellFactory.create("178").filed,
      weight: cellFactory.create("70").filed,
    };
  }
}
// 检验是否占用相同内存
// for (let i = 0; i < LEN; i++) {
//   if (i % 2 === 0 && i > 2) {
//     console.log(arr1[i].id === arr1[i - 2].id);
//   }
// }
const newRowFy = reactive(arr1);
</script>
