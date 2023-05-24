<template>
<!--  <my-table :rows="rows" :columns="columns">-->
<!--  </my-table>-->

<!--  <my-table-demo :rows="rows" :columns="columns" >-->
<!--&lt;!&ndash;    <my-col field="id"></my-col>&ndash;&gt;-->
<!--    <template #inputName="{row}">-->
<!--      <vxe-select v-model="row.age" placeholder="默认尺寸">-->
<!--        <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`"></vxe-option>-->
<!--      </vxe-select>-->
<!--    </template>-->

<!--  </my-table-demo>-->
<!--  <tes-two></tes-two>-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  <test-one></test-one>-->
  <table-component :rows="rows" :columns="columns">
<!--    循环row，划分列-->
    <template #input>
      <input >
    </template>
    <template #select="{row}">
      <vxe-input size="mini" type="search" :model-value="row"></vxe-input>
    </template>
  </table-component>
</template>

<script>
// import testOne from "@/components/testOne.vue";
import TableComponent from "@/Table/TableComponent";
// import MyTable from "@/my-table/my-table.vue";
// import MyCol from "@/my-table/my-col.vue";
// import MyTableDemo from "@/my-table/my-table-demo.vue";
// import MyCol from "@/my-table/my-col.vue";
// import TesTwo from "@/components/test2-l.vue";

export default {
  name: 'App',
  components: {
    // MyCol,
    // MyTableDemo,
    // MyCol,
    // TesTwo,
    // MyTable
    TableComponent,
    // HelloWorld,
  },
  data() {
    return {
      columns: [
        { field: 'id', title: 'ID',type:'input' },
        { field: 'name', title: 'Name' ,type: 'input'},
        { field: 'email', title: 'Email' ,type:'input'},
        { field: 'sex', title: 'Sex',type: 'input' },
        { field: 'score', title: 'Score' ,type:'input'},
        { field: 'home', title: 'Home' ,type:'input'},
        { field: 'age', title: 'Age' ,type: 'input'},
        { field: 'hobby', title: 'Hobby' ,type:'input'},
        { field: 'height', title: 'Height' ,type:'input'},
        { field: 'weight', title: 'Weight' ,type:'input'},
      ],
      rows: [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
        { id: 1, name: 'John Doe', email: 'johndoe@example.com',sex:'男',score:90,home:'shanghai',age:'18',hobby:'music',height:'180',weight:'70' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' ,sex:'男',score:91,home:'shanghai',age:'17',hobby:'movie',height:'178',weight:'76'},
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com',sex:'女',score:96,home:'nanjing',age:'18',hobby:'table-tennis',height:'170',weight:'50' },
      ]
    }
  },
  // computed:{
  //   inputShow:function (){
  //     return this.columns.forEach((item)=>{
  //       return item.type === 'input';
  //     })
  //   },
  //   selectShow:function (){
  //     return this.columns.forEach((item) =>{
  //       return item.type === 'select';
  //     })
  //   }
  // }
}
</script>

<style>

</style>
<!--<template>-->
<!--  <div>-->
<!--    <my-table :data="tableData">-->
<!--      <my-column >111</my-column>-->
<!--    </my-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import MyTable from './components/test2-l.vue';-->
<!--import MyColumn from './components/my-column.vue';-->

<!--export default {-->
<!--  components: {-->
<!--    MyTable,-->
<!--    MyColumn-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      tableData: [-->
<!--        { field1: 'Data 1', field2: 'Data 2', field3: 'Data 3' },-->
<!--        { field1: 'Data 4', field2: 'Data 5', field3: 'Data 6' },-->
<!--        // 添加更多数据行...-->
<!--      ]-->
<!--    };-->
<!--  }-->
<!--};-->
<!--</script>-->
