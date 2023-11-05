<template>
  <vxe-table
    border
    show-overflow
    ref="xTable"
    :loading="demo1.loading"
    :data="demo1.tableData"
    :edit-config="{
      trigger: 'click',
      mode: 'cell',
      icon: 'vxe-icon-question-circle-fill',
    }"
    @checkbox-change="checkboxChangeEvent"
    @checkbox-all="checkboxChangeEvent"
  >
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column
      field="role"
      title="Role"
      :edit-render="{ autofocus: '.vxe-input--inner' }"
    >
      <template #edit="{ row }">
        <vxe-input type="text" v-model="row.role"></vxe-input>
      </template>
    </vxe-column>
    <vxe-column
      field="name"
      title="Name"
      :edit-render="{ autofocus: '.custom-input' }"
    >
      <template #edit="{ row }">
        <vxe-pulldown ref="xDown1" transfer>
          <template #default>
            <vxe-input
              v-model="row.name"
              placeholder="下拉容器"
              @click="clickDownEvent"
            ></vxe-input>
          </template>
          <template #dropdown>
            <ul class="my-downpanel1">
              <li
                v-for="item in demo1.downList"
                :key="item.value"
                @click="changeNameEvent(item, row)"
              >
                <i class="vxe-icon-question-circle-fill"></i>
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </template>
        </vxe-pulldown>
      </template>
    </vxe-column>
    <vxe-colgroup title="分组">
      <vxe-column
        field="age"
        title="Age"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input type="number" v-model="row.age"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column
        field="num"
        title="Money"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input type="number" v-model="row.num"></vxe-input>
        </template>
        <template #default="{ row }">￥{{ row.num }}</template>
      </vxe-column>
    </vxe-colgroup>
    <vxe-column field="attr1" title="不同行渲染" :edit-render="{}">
      <template #edit="scope">
        <template v-if="scope.rowIndex === 0">
          <vxe-input
            type="date"
            v-model="scope.row.attr1"
            placeholder="请选择日期"
            @input="$refs.xTable.updateStatus(scope)"
            transfer
          ></vxe-input>
        </template>
        <template v-else-if="scope.rowIndex === 1">
          <vxe-select
            v-model="scope.row.attr1"
            placeholder="请选择下拉"
            transfer
          >
            <vxe-option value="选项1" label="选项1"></vxe-option>
            <vxe-option value="选项2" label="选项2"></vxe-option>
            <vxe-option value="选项3" label="选项3"></vxe-option>
          </vxe-select>
        </template>
        <template v-else-if="scope.rowIndex === 2">
          <vxe-input
            type="number"
            v-model="scope.row.attr1"
            placeholder="请输入数值"
          ></vxe-input>
        </template>
        <template v-else>
          <vxe-input
            type="text"
            v-model="scope.row.attr1"
            placeholder="请输入内容"
          ></vxe-input>
        </template>
      </template>
    </vxe-column>
  </vxe-table>

  <vxe-pager
    perfect
    v-model:current-page="demo1.tablePage.currentPage"
    v-model:page-size="demo1.tablePage.pageSize"
    :total="demo1.tablePage.total"
    :layouts="[
      'PrevJump',
      'PrevPage',
      'Number',
      'NextPage',
      'NextJump',
      'Sizes',
      'FullJump',
      'Total',
    ]"
  >
    <template #left>
      <span class="page-left">
        <vxe-checkbox
          v-model="demo1.isAllChecked"
          :indeterminate="demo1.isIndeterminate"
          @change="changeAllEvent"
        ></vxe-checkbox>
        <span class="select-count"
          >自定义模板 {{ demo1.selectRecords.length }} 条</span
        >
        <vxe-button>修改</vxe-button>
        <vxe-button>管理</vxe-button>
        <vxe-button>删除</vxe-button>
        <vxe-button size="small">
          <template #default>更多操作</template>
          <template #dropdowns>
            <vxe-button type="text">批量修改</vxe-button>
            <vxe-button type="text">批量管理</vxe-button>
            <vxe-button type="text">批量删除</vxe-button>
          </template>
        </vxe-button>
      </span>
    </template>
    <template #right>
      <img
        src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif"
        height="34"
      />
      <img
        src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif"
        height="34"
      />
      <img
        src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif"
        height="34"
      />
    </template>
  </vxe-pager>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import newFactory from "@/FlyWeight";
let sizeof = require("object-sizeof");

export default defineComponent({
  setup() {
    const demo1 = reactive({
      loading: false,
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [],
      tableData: [],
      downList: [
        { label: "选项1", value: 1 },
        { label: "选项2", value: 2 },
        { label: "选项3", value: 3 },
        { label: "选项4", value: 4 },
        { label: "选项5", value: 5 },
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    });
    const list6 = reactive([
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        sex: "男",
        score: 90,
        home: "shanghai",
        age: "18",
        hobby: "music",
        height: "180",
        weight: "70",
      },
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        sex: "男",
        score: 90,
        home: "shanghai",
        age: "18",
        hobby: "music",
        height: "180",
        weight: "70",
      },
    ]);
    const id = ref(10001);
    const name = ref("test1");
    const nikeName = ref("t2");
    const role = ref("develop");
    const sex = ref("男");
    const age = ref(24);
    const sex2 = ref("123");
    const num1 = ref("123");
    const address = ref(111);
    const date12 = ref(22);
    const date23 = ref("222");

    const xTable = ref();
    const xDown1 = ref();

    const checkboxChangeEvent = () => {
      const $table = xTable.value;
      demo1.isAllChecked = $table.isAllCheckboxChecked();
      demo1.isIndeterminate = $table.isAllCheckboxIndeterminate();
      demo1.selectRecords = $table.getCheckboxRecords();
    };

    const changeAllEvent = () => {
      const $table = xTable.value;
      $table.setAllCheckboxRow(demo1.isAllChecked);
      demo1.selectRecords = $table.getCheckboxRecords();
    };

    const clickDownEvent = () => {
      const $pulldown1 = xDown1.value;
      if ($pulldown1) {
        $pulldown1.showPanel();
      }
    };

    const changeNameEvent = (item, row) => {
      const $pulldown1 = xDown1.value;
      row.name = item.label;
      if ($pulldown1) {
        $pulldown1.hidePanel();
      }
    };

    demo1.loading = true;
    setTimeout(() => {
      const list1 = [
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
        {
          id: newFactory.getFlyweight(id),
          name: newFactory.getFlyweight(name),
          nickname: newFactory.getFlyweight(nikeName),
          role: newFactory.getFlyweight(role),
          sex: newFactory.getFlyweight(sex),
          sex2: newFactory.getFlyweight(sex2),
          num1: newFactory.getFlyweight(num1),
          age: newFactory.getFlyweight(age),
          address: newFactory.getFlyweight(address),
          date12: newFactory.getFlyweight(date12),
          date13: newFactory.getFlyweight(date23),
        },
      ];
      const list3 = [
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
        {
          id: id,
          name: name,
          nickname: nikeName,
          role: role,
          sex: sex,
          sex2: sex2,
          num1: num1,
          age: age,
          address: address,
          date12: date12,
          date13: date23,
        },
      ];
      const list5 = [
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
        {
          name: newFactory.getFlyweight("name"),
          role: newFactory.getFlyweight("2222"),
          age: newFactory.getFlyweight("age"),
        },
      ];
      console.log( sizeof(list5));
      // console.log(list1, list5);
      demo1.loading = false;
      demo1.tableData = list5;
      console.log(list5);
    }, 100);

    return {
      demo1,
      xTable,
      xDown1,
      checkboxChangeEvent,
      changeAllEvent,
      clickDownEvent,
      changeNameEvent,
    };
  },
});
</script>
