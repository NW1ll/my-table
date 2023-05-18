<template>
  <table>
    <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
      <th>Header 4</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td>{{ item.column1 }}</td>
      <td>{{ item.column2 }}</td>
      <td>
        <!-- 根据列的类型展示不同的控件 -->
        <template v-if="item.column3Type === 'input'">
          <input type="text" v-model="item.column3Value" />
        </template>
        <template v-else-if="item.column3Type === 'select'">
          <select v-model="item.column3Value">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </template>
        <template v-else>
          <!-- 默认情况下展示原单元格内容 -->
          {{ item.column3 }}
        </template>
      </td>
      <td>
        <!-- 根据列的类型展示不同的控件 -->
        <template v-if="item.column4Type === 'checkbox'">
          <input type="checkbox" v-model="item.column4Value" />
        </template>
        <template v-else-if="item.column4Type === 'radio'">
          <label>
            <input type="radio" value="option1" v-model="item.column4Value" />
            Option 1
          </label>
          <label>
            <input type="radio" value="option2" v-model="item.column4Value" />
            Option 2
          </label>
          <label>
            <input type="radio" value="option3" v-model="item.column4Value" />
            Option 3
          </label>
        </template>
        <template v-else>
          <!-- 默认情况下展示原单元格内容 -->
          {{ item.column4 }}
        </template>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          column1: 'Data 1',
          column2: 'Data 2',
          column3: 'Data 3',
          column3Type: 'input',
          column3Value: '',
          column4: 'Data 4',
          column4Type: 'checkbox',
          column4Value: false
        },
        // 添加更多数据项
      ]
    };
  }
};
</script>
