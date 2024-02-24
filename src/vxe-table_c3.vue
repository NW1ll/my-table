<template>
  <div >
    <!-- 正常区域的框 -->
    <div class="vxe-table--cell-area" ref="cellarea">
      <span class="vxe-table--cell-main-area"></span>
      <span class="vxe-table--cell-active-area"></span>
    </div>
    <!-- 左侧fixed区域的框 -->
    <div class="vxe-table--cell-area" ref="leftfixedcellarea">
      <span class="vxe-table--cell-main-area"></span>
      <span class="vxe-table--cell-active-area"></span>
    </div>
    <!-- 右侧fixed区域的框 -->
    <div class="vxe-table--cell-area" ref="rightfixedcellarea">
      <span class="vxe-table--cell-main-area"></span>
      <span class="vxe-table--cell-active-area"></span>
    </div>

    <vxe-grid ref='xGrid' v-bind="gridOptions" height="600px"
              @toolbar-button-click="toolbarButtonClickEvent"
              border
              show-overflow
              :scroll-y="{enabled: true, gt: 0}"
              :scroll-x="{enabled: true, gt: 0}"
              @keydown="onKeyDown"
              @cell-click="tableCellClick"
    >>
    </vxe-grid>
  </div>
</template>

<script  setup>
import XEClipboard from '../src/clipboard';
import {nextTick, onMounted, reactive, ref} from "vue";

let gridOptions = reactive({
  //左上角按钮
  toolbarConfig: {
    perfect: true,
    enabled: true,
    size: "mini",
    buttons: [
      {
        code: 'getcellselctdata', type: "text", name: '获取选中数据'
      }
    ],
  },
  keyboardConfig:{
    isArrow: true,
  },
  //列配置 (使用列拖拽功能,必须配置useKey为true)
  columnConfig: { resizable: true, useKey: true },

  showHeaderOverflow: true,
  height: 500,

  checkboxConfig: {
    labelField: 'id'
  },
  loading: false,
  //边框
  border: "full",
  //斑马纹
  stripe: true,


  //列信息
  columns: [//列总宽度为1500
    { width: 100, field: "id", title: "#", align: "left", fixed: 'left' },
    { width: 100, field: "name", title: "姓名", align: "left", fixed: 'left' },
    { width: 400, field: "age", title: "年龄", align: "left" },
    { width: 400, field: "sex", title: "性别", align: "left" },
    { width: 100, field: "job", title: "岗位", align: "left", fixed: 'right' },
    { width: 100, field: "address", title: "地址", align: "left", fixed: 'right' }
  ],
  //数据
  data: [
    { id: 1, name: "张三", age: 30, sex: "男", job: "前端", address: "中国xxxxxxxxxx" },
    { id: 2, name: "李四", age: 30, sex: "男", job: "后端", address: "中国xxxxxxxxxx" },
    { id: 3, name: "王五", age: 30, sex: "女", job: "运维", address: "中国xxxxxxxxxx" },
    { id: 4, name: "赵六", age: 30, sex: "男", job: "美工", address: "中国xxxxxxxxxx" },
    { id: 5, name: "老八", age: 30, sex: "男", job: "项目经理", address: "中国xxxxxxxxxx" },
    { id: 6, name: "桀桀", age: 30, sex: "女", job: "售后", address: "中国xxxxxxxxxx" },
    { id: 7, name: "张三", age: 30, sex: "男", job: "前端", address: "中国xxxxxxxxxx" },
    { id: 8, name: "李四", age: 30, sex: "男", job: "后端", address: "中国xxxxxxxxxx" },
    { id: 9, name: "王五", age: 30, sex: "女", job: "运维", address: "中国xxxxxxxxxx" },
    { id: 10, name: "赵六", age: 30, sex: "男", job: "美工", address: "中国xxxxxxxxxx" },
    { id: 11, name: "老八", age: 30, sex: "男", job: "项目经理", address: "中国xxxxxxxxxx" },
    { id: 12, name: "桀桀", age: 30, sex: "女", job: "售后", address: "中国xxxxxxxxxx" },
    { id: 13, name: "张三", age: 30, sex: "男", job: "前端", address: "中国xxxxxxxxxx" },
    { id: 14, name: "李四", age: 30, sex: "男", job: "后端", address: "中国xxxxxxxxxx" },
    { id: 15, name: "王五", age: 30, sex: "女", job: "运维", address: "中国xxxxxxxxxx" },
    { id: 16, name: "赵六", age: 30, sex: "男", job: "美工", address: "中国xxxxxxxxxx" },
    { id: 17, name: "老八", age: 30, sex: "男", job: "项目经理", address: "中国xxxxxxxxxx" },
    { id: 18, name: "桀桀", age: 30, sex: "女", job: "售后", address: "中国xxxxxxxxxx" },
  ],
  //这里一定要指定true，否则rowConfig的height没用
  showOverflow: true,
  //行配置,这里的行高一定需要指定
  rowConfig: { isCurrent: true, height: 35, isHover: true },
})
//#region 以下是鼠标选中功能


//鼠标滑动选中
let isSelecting = ref(false) // 是否正在进行选择操作,默认为false
let selectionStart = reactive({ rowIndex: -1, cellIndex: -1 }) // 选择操作起始单元格位置
let selectionEnd = reactive({ rowIndex: -1, cellIndex: -1 }) // 选择操作结束单元格位置


onMounted(() => {
  addListener()
})
//获取页面ref节点
//获取vxetable表格节点
let xGrid = ref()
let cellarea = ref()
let leftfixedcellarea = ref()
let rightfixedcellarea = ref()

//返回table的ref名称
const getTablexGrid = () => {
  return xGrid.value
}

//添加事件
const addListener = () => {
  //添加多选列
  nextTick(() => {
    window.addEventListener("mousedown", tableOutDestroyAreaBox)//给window添加鼠标按下事件,判断是否在表格外,是销毁
    window.addEventListener("mouseup", tbodymouseup)//给window添加鼠标松开事件
    let tbody = getTablexGrid().$el.querySelector(".vxe-table--main-wrapper table tbody")//获取tbody区域
    if (tbody) {
      tbody.addEventListener("mousedown", tbodymousedown)//给表格中的tbody添加鼠标按下事件
      tbody.addEventListener("mousemove", tbodymousemove)//给表格中的tbody添加鼠标移动事件
      tbody.addEventListener("mouseout", throttle(tbodymouseout, 50))//给表格中的tbody添加鼠标移出事件
      tbody.addEventListener("click", tableCellClick)//添加左键单击事件
      tbody.addEventListener("paste",tbodykeydown)
      tbody.oncontextmenu = tableCellMenuClick//添加右键菜单事件
    }

    let bodyWrapper = getTablexGrid().$el.querySelector(".vxe-table--main-wrapper .vxe-table--body-wrapper")//获取正常区域的body
    if (bodyWrapper) {
      //注意这里的ref名称，这里是非fixed区域的框的名称
      bodyWrapper.appendChild(cellarea.value)//添加范围框元素
    }
    setTimeout(() => {
      //#region 左侧固定列
      let leftfixedtbody = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper table tbody")//获取fixedtbody区域

      if (leftfixedtbody) {
        leftfixedtbody.addEventListener("mousedown", tbodymousedown)//给表格中的leftfixedtbody添加鼠标按下事件
        leftfixedtbody.addEventListener("mousemove", tbodymousemove)//给表格中的leftfixedtbody添加鼠标移动事件
        leftfixedtbody.addEventListener("mouseout", throttle(tbodymouseout, 50))//给表格中的leftfixedtbody添加鼠标移出事件
        leftfixedtbody.addEventListener("click", tableCellClick)//添加单击事件
        leftfixedtbody.oncontextmenu = tableCellMenuClick//添加右键菜单事件
      }

      let leftFixedBodyWrapper = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper")
      if (leftFixedBodyWrapper) {
        //注意这里的ref名称，这里是fixed区域的框的名称
        leftFixedBodyWrapper.appendChild(leftfixedcellarea.value)
      }
      //#endregion

      //#region 右侧固定列
      let rightfixedtbody = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-right-wrapper .vxe-table--body-wrapper table tbody")//获取fixedtbody区域

      if (rightfixedtbody) {
        rightfixedtbody.addEventListener("mousedown", tbodymousedown)//给表格中的rightfixedtbody添加鼠标按下事件
        rightfixedtbody.addEventListener("mousemove", tbodymousemove)//给表格中的rightfixedtbody添加鼠标移动事件
        rightfixedtbody.addEventListener("mouseout", throttle(tbodymouseout, 50))//给表格中的rightfixedtbody添加鼠标移出事件
        rightfixedtbody.addEventListener("click", tableCellClick)//添加单击事件
        rightfixedtbody.oncontextmenu = tableCellMenuClick//添加右键菜单事件
      }

      let rightFixedBodyWrapper = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-right-wrapper .vxe-table--body-wrapper")
      if (rightFixedBodyWrapper) {
        //注意这里的ref名称，这里是fixed区域的框的名称
        rightFixedBodyWrapper.appendChild(rightfixedcellarea.value)
      }
      //#endregion

    }, 100)
  })
}

//鼠标按下事件
const tbodymousedown = (event) => {
  // event.stopPropagation()//阻止冒泡
  getTablexGrid().closeMenu()//手动关闭右键菜单
  //左键0,中键1,右键2
  if (event.button === 0) {//左键按下
    // 记录选择操作起始位置
    selectionStart = getCellPosition(event.target)//设置选择操作起始单元格位置

    isSelecting.value = true//标记为正在选择操作
  }
}
const onKeyDown = ({$event}) =>{
  tbodykeydown($event);
}
// 事件集合
const tbodykeydown = (event) =>{
  let tablexgrid=getTablexGrid();
  let tableColumn=getTablexGrid().getTableColumn()["visibleColumn"];
  let tableData=getTablexGrid().getTableData()["visibleData"];
  let startRowIndex=selectionStart["rowIndex"];
  let endRowIndex=selectionEnd["rowIndex"];
  let startColumnIndex=selectionStart["cellIndex"];
  let endColumnIndex=selectionEnd["cellIndex"];
  var maxColumnIndex=tableColumn.length-1;
  var maxRowIndex=tableData.length-1;
  var minColumnIndex=0;
  var minRowIndex=0;

  if (event.ctrlKey && event.keyCode === 67) {
    //ctrl+c 复制
    contextMenuClickEvent({menu:{code:"cellCopy"}});
    event.preventDefault();
  }else if(event.ctrlKey&&event.keyCode === 86){
    //ctrl+v 粘贴
    contextMenuClickEvent({menu:{code:"cellPaste"}});
    event.preventDefault();
  }else if(event.ctrlKey && event.key === 'd'){
    //ctrl+d
    console.log('d')
    contextMenuClickEvent({menu:{code:"cellLineCopy"}});
    event.preventDefault();
  }else if(event.key === 'Delete'){
    //delete
    contextMenuClickEvent({menu:{code:"cellDelete"}});
    event.preventDefault();
  }else if(event.ctrlKey && event.key === 'x'){
    //ctrl+x
    contextMenuClickEvent({menu:{code:"cellCut"}});
    console.log(tableData=getTablexGrid().getTableData()["visibleData"])
    event.preventDefault();
  }else if(event.ctrlKey && event.key === 'z'){
    //ctrl+z
    contextMenuClickEvent({menu:{code:"cellSortValue"}});
    event.preventDefault();
  }else if(event.keyCode===39){
    //右键 向右
    if(endColumnIndex+1<=maxColumnIndex){
      var currentRow=tablexgrid.getCurrentRecord();
      const rowIndex =tableData.findIndex((row)=>{
        return row._X_ROW_KEY==currentRow._X_ROW_KEY;
      })
      selectionStart={"cellIndex":endColumnIndex+1,"rowIndex":rowIndex};
      selectionEnd={"cellIndex":endColumnIndex+1,"rowIndex":rowIndex};
    }
    setselectedCellArea();
    tableScrollMove("right");
    event.preventDefault();
  }else if(event.keyCode===37){
    //左键 向左
    if(startColumnIndex-1>=minColumnIndex){
      var currentRow=tablexgrid.getCurrentRecord();
      const rowIndex =tableData.findIndex((row)=>{
        return row._X_ROW_KEY==currentRow._X_ROW_KEY;
      })
      selectionStart={"cellIndex":startColumnIndex-1,"rowIndex":rowIndex};
      selectionEnd={"cellIndex":startColumnIndex-1,"rowIndex":rowIndex};
    }
    setselectedCellArea();
    tableScrollMove("left");
    event.preventDefault();
  }else if(event.keyCode===38){
    //向上
    var currentRow=tablexgrid.getCurrentRecord();
    const rowIndex =tableData.findIndex((row)=>{
      return row._X_ROW_KEY==currentRow._X_ROW_KEY;
    })
    if(rowIndex-1>=minRowIndex){
      selectionStart={"cellIndex":startColumnIndex,"rowIndex":rowIndex-1};
      selectionEnd={"cellIndex":startColumnIndex,"rowIndex":rowIndex-1};
    }
    setselectedCellArea();
    //判断是否小于最小行的个数
    event.preventDefault();
  }else if(event.keyCode===40){
    //向下
    var currentRow=tablexgrid.getCurrentRecord();
    const rowIndex =tableData.findIndex((row)=>{
      return row._X_ROW_KEY==currentRow._X_ROW_KEY;
    })
    if(rowIndex+1<=maxRowIndex){
      selectionStart={"cellIndex":startColumnIndex,"rowIndex":rowIndex+1};
      selectionEnd={"cellIndex":startColumnIndex,"rowIndex":rowIndex+1};
    }
    setselectedCellArea();
    event.preventDefault();
  }
}
// 事件处理集合
const contextMenuClickEvent = ({menu,row,column,rowIndex,columnIndex,$event}) =>{
  let startRowIndex=selectionStart["rowIndex"];
  let endRowIndex=selectionEnd["rowIndex"];
  let startColumnIndex=selectionStart["cellIndex"];
  let endColumnIndex=selectionEnd["cellIndex"];
  let tableColumn=JSON.parse(JSON.stringify(getTablexGrid().getTableColumn()["visibleColumn"]));
  let tableData=getTablexGrid().getTableData()["visibleData"];
  switch(menu.code){
      //复制
    case "cellCopy":
      let enterStr="\r\n";
      let spaceStr="\t";
      let data=[];
      for(var i=startRowIndex;i<=endRowIndex;i++){
        let value=[];
        for(var j=startColumnIndex;j<=endColumnIndex;j++){
          value.push(tableData[i][tableColumn[j].field]);
        }
        data.push(value);
      }
      let finalStr=data.map((value)=>{
        return value.join(spaceStr);
      }).join(enterStr);
      copyValue(finalStr);
      break;
      //粘贴
    case "cellPaste":
      navigator.clipboard.readText().then((text)=>{
        if(text){
          //去除首尾换行
          text=text.replace(/^\r\n+|\r\n+$/g, '');
          var snsArr=text.split(/\r\n+/);
          var tArr=snsArr.map((value)=>{
            return value.split("\t");
          })
          for(var i=0;i<tArr.length;i++){
            let line=tArr[i];
            if(startRowIndex+i>tableData.length-1)break;
            let row=tableData[startRowIndex+i];
            for(var j=0;j<line.length;j++){
              if(startColumnIndex+j>tableColumn.length)break;
              let column=tableColumn[startColumnIndex+j];
              row[column.field]=line[j];
            }
          }
        }
      })
      break;
      //delete清除
    case "cellDelete":
      for(var i=startRowIndex;i<=endRowIndex;i++){
        if(i>tableData.length-1)break;
        for(var j=startColumnIndex;j<=endColumnIndex;j++){
          if(j>tableColumn.length-1)break;
          let row=tableData[i];
          let column=tableColumn[j];
          getTablexGrid().clearData(row,column.property);
        }
      }
      break;
    case "cellLineCopy":
      //第一行的值不变,后面的行等于第一行的值
      var firstRow=tableData[startRowIndex];
      for(var i=startRowIndex+1;i<=endRowIndex;i++){
        if(i>tableData.length-1)break;
        for(var j=startColumnIndex;j<=endColumnIndex;j++){
          if(j>tableColumn.length-1)break;
          tableData[i][tableColumn[j].field]=firstRow[tableColumn[j].field];
        }
      }
      break;
    case "cellCut":
      //剪切
      contextMenuClickEvent({menu:{code:"cellCopy"}});
      contextMenuClickEvent({menu:{code:"cellDelete"}});
      break;
    case "cellSortValue":
      //自增
      var firstRow=tableData[startRowIndex];
      for(var i=startRowIndex+1;i<=endRowIndex;i++){
        if(i>tableData.length-1)break;
        for(var j=startColumnIndex;j<=endColumnIndex;j++){
          if(j>tableColumn.length-1)break;
          let value=firstRow[tableColumn[j].field];
          if(!value)break;
          if(!isNaN(value)){
            tableData[i][tableColumn[j].field]=parseFloat(value)+(i-startRowIndex);
          }else{
            //最后一个字符
            let lastChar=value[value.length-1];
            //去除最后一个字符
            let nvalChar=value.slice(0, -1);
            if(/[a-zA-Z]/.test(lastChar)){
              let result =generateAlphabetChars(lastChar,i-startRowIndex+1);
              console.log(result);
              tableData[i][tableColumn[j].field]=nvalChar+result;
            }
          }
        }
      }
      break;
  }
}
const generateAlphabetChars = (c, shift) =>{
  /**
   * 将一个字符按照指定的偏移量进行移位
   * @param {string} c 需要移位的字符
   * @param {number} shift 移位的偏移量
   * @returns {string} 移位后的字符
   */
      // 将字符转换为 ASCII 码
  let asciiCode = c.charCodeAt(0);
  // 计算移位后的 ASCII 码
  let shiftedAsciiCode = asciiCode + shift;
  let flag = false;
  if (shiftedAsciiCode > 122) {
    shiftedAsciiCode -= 26;
  } else if (shiftedAsciiCode < 97) {
    shiftedAsciiCode += 26;
  }
  // 将 ASCII 码转换为字符
  const shiftedChar = String.fromCharCode(shiftedAsciiCode);
  return asciiCode + shift > 122 ? 'a' + shiftedChar: shiftedChar;
}
// 拷贝
const copyValue = (value) => {
  if (XEClipboard.copy(value)) {
    console.log(value)
  }
}
// 事件处理方法
const tableScrollMove = (move) =>{
  let tableColumn=getTablexGrid().getTableColumn()["visibleColumn"];
  let tableData=getTablexGrid().getTableData()["visibleData"];
  let startRowIndex=selectionStart["rowIndex"];
  let endRowIndex=selectionEnd["rowIndex"];
  let startColumnIndex=selectionStart["cellIndex"];
  let endColumnIndex=selectionEnd["cellIndex"];

  let fixedWidth=0;

  //获取固定列宽度fixed--hidden

  let flexDiv=getTablexGrid().$el.querySelector(".vxe-table--fixed-left-wrapper");
  if(flexDiv){
    fixedWidth=flexDiv.offsetWidth;
  }
  //获取td
  let td;
  let tbody=getTablexGrid().$el.querySelector(".vxe-table--main-wrapper table tbody");
  if(tbody && move ==="left"){
    let column=tableColumn[startColumnIndex];
    td=tbody.querySelector(`td[colid="${column.id}"]`);
  }else if(tbody&& move ===  "right"){
    let column=tableColumn[endColumnIndex];
    td=tbody.querySelector(`td[colid="${column.id}"]`);
  }
  if(td){
    //判断是否隐藏
    var tdRect=td.getBoundingClientRect();
    var table=getTablexGrid().$el.querySelector(".vxe-table--body-wrapper table");
    if(table){
      let tableRect=table.parentElement.getBoundingClientRect();
      //需要减去左边固定列的宽度
      if (tdRect.top < tableRect.top ||tdRect.bottom > tableRect.bottom ||
          tdRect.left < tableRect.left+fixedWidth ||tdRect.right > tableRect.right){
        if(move=="right"){
          table.parentElement.scrollLeft+=(tdRect.right-tableRect.right);
        }else if(move=="left"){
          table.parentElement.scrollLeft+=(tdRect.left-tableRect.left-fixedWidth);
        }
      } else {
        // console.log("该 td 元素未隐藏");
      }
    }
  }
}


//鼠标移动事件
//todo 这里要节流操作,只在结束时触发一次
const tbodymousemove = (event) => {
  if (event.button === 0) {//左键移动
    if (!isSelecting.value) return//如果当前非正在选择操作,直接退出
    //记录选择操作结束位置
    selectionEnd = getCellPosition(event.target)

    //设置样式,并显示范围框
    setselectedCellArea()

  }
}

//鼠标按键结束事件,添加在了window中
const tbodymouseup = (event) => {
  if (event.button === 0) {//左键松开
    isSelecting.value = false//标记为停止选择操作
  }
}

let outevent = ref()//移动事件,不保存,循环定时器内无法监听到新的事件

//鼠标移出表格事件,只在移动的时候会触发,暂停移动不触发
const tbodymouseout = (event) => {
  outevent.value = event//保存移动事件

  if (isSelecting.value) {//如果正在执行选中操作
    const timer = setInterval(() => {//开启循环定时器
      if (isSelecting.value) {//判断当前是否正在选择
        //获取表格元素
        var table = getTablexGrid().$el.querySelector(".vxe-table--body-wrapper table")//获取非固定列(和固定列)的table元素
        if (outevent.value.clientX > table.parentElement.getBoundingClientRect().right - 30) {//判断鼠标x轴是否超出表格右侧,向右滚动
          var maxScrollPosition = table.parentElement.scrollWidth - table.parentElement.clientWidth//获取滚动条最大位置
          if (table.parentElement.scrollLeft < maxScrollPosition) {//如果没到滚动条最大位置,执行滚动
            table.parentElement.scrollLeft += 10//执行水平滚动条向右滚动
          }
        } else if (outevent.value.clientX < table.parentElement.getBoundingClientRect().left + 30) {//判断鼠标x轴是否超出表格左侧,向左滚动
          if (table.parentElement.scrollLeft > 0) {//如果没到滚动条最大位置,执行滚动
            //鼠标移出表格，滚动水平滚动条
            table.parentElement.scrollLeft -= 10//执行水平滚动条向右滚动
          }
        }
      } else {
        clearInterval(timer)//清除循环定时器
      }
    }, 200)//这里设置滑动速度

  }

}

//节流函数,todo//改为全局
const throttle = (fn, delay) => {
  const canRun = ref(true)
  return (...args) => {
    if (!canRun.value) return
    canRun.value = false
    setTimeout(() => {
      fn(...args)
      canRun.value = true
    }, delay)
  }
}

// 获取单元格位置(rowIndex, cellIndex)
const getCellPosition = (cell) => {
  // const propertyName = {
  //   'vtable':_X_ROW_KEY,
  //   'ant-d':key,

  // };
  while (cell.tagName !== 'TD') {//将cell指向TD元素
    cell = cell.parentElement
  }
  let visibleColumn = getTablexGrid().getTableColumn().visibleColumn//获取处理条件之后的全量表头列
  const cellIndex = visibleColumn.findIndex((col) => {//返回colid相等的visibleColumn全量表头列的索引
    return col.id == cell.getAttribute("colid")
  })
  let visibleData = getTablexGrid().getTableData().visibleData//获取处理条件之后的全量表体数据
  const rowIndex = visibleData.findIndex((row) => {//返回rowid相等的visibleData全量表体数据
    return row._X_ROW_KEY == cell.parentElement.getAttribute("rowid")//返回rowid相等的visibleData全量表体数据的索引
  })
  console.log(rowIndex,cellIndex)
  return { rowIndex, cellIndex }
}

//设置框打开
const setselectedCellArea = () => {
  var activeElement = getTablexGrid().$el.querySelector(".vxe-table--main-wrapper .vxe-table--body-wrapper .vxe-table--cell-active-area")//正常区域选中边框激活的元素(仅是边框)
  var mainElement = getTablexGrid().$el.querySelector(".vxe-table--main-wrapper .vxe-table--body-wrapper .vxe-table--cell-main-area")//正常区域选中边框内整个范围的元素
  var leftFixedActiveElement = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper .vxe-table--cell-active-area")//左侧固定列选中边框激活的元素(仅是边框)
  var leftFixedMainElement = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper .vxe-table--cell-main-area")//左侧固定列选中边框内整个范围的元素
  var rightFixedActiveElement = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-right-wrapper .vxe-table--body-wrapper .vxe-table--cell-active-area")//右侧固定列选中边框激活的元素(仅是边框)
  var rightFixedMainElement = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-right-wrapper .vxe-table--body-wrapper .vxe-table--cell-main-area")//右侧固定列选中边框内整个范围的元素


  var elements = [activeElement, mainElement, leftFixedActiveElement, leftFixedMainElement, rightFixedActiveElement, rightFixedMainElement]
  let area = getAreaBoxPosition()
  if (area) {
    var { width, height, left, top, right } = area
  } else {
    return
  }
  elements.forEach((element, index) => {
    if (element) {//设置显示范围框的内部元素的样式
      element.style.width = `${width}px`
      element.style.height = `${height}px`
      element.style.top = `${top}px`
      element.style.display = "block"
      if (index <= elements.length - 1 - 2) {//如果不是rightFixedActiveElement或rightFixedMainElement
        element.style.left = `${left}px`
      } else {
        element.style.right = `${right}px`
      }
    }
  })
  //显示范围框
  openAreaBox()
}

//根据开始位置和结束位置的索引计算框的width,height,left,top(左侧固定列和正常区域和右侧固定列使用)
const getAreaBoxPosition = () => {
  let startRowIndex = selectionStart.rowIndex//获取选中起始行索引
  let endRowIndex = selectionEnd.rowIndex//获取选中结束行索引
  let startColumnIndex = selectionStart.cellIndex//获取选中起始列索引
  let endColumnIndex = selectionEnd.cellIndex//获取选中结束列索引
  let visibleColumn = getTablexGrid().getTableColumn().visibleColumn//获取处理条件之后的全量表头列
  let visibleData = getTablexGrid().getTableData().visibleData//获取处理条件之后的全量表体数据
  if (startColumnIndex < 0 || endColumnIndex < 0 || startRowIndex < 0 || endRowIndex < 0) return
  var maxColumnIndex = visibleColumn.length - 1//最大列索引
  var maxRowIndex = visibleData.length - 1//最大行索引
  if (endColumnIndex > maxColumnIndex) {//到最后一列,指向最后一列
    endColumnIndex = maxColumnIndex
  }
  if (endRowIndex > maxRowIndex) {//到最后一行,指向最后一行
    endRowIndex = maxRowIndex
  }
  let width = 0, height = 0, left = 0, top = 0, right = 0
  visibleColumn.forEach((col, index) => {
    if (startColumnIndex <= endColumnIndex) {//开始列索引小于结束列索引,即从左往右选择
      if (index < startColumnIndex) {
        left += col.renderWidth//距离表格整体左侧边框距离
      }
      if (index > endColumnIndex) {//数据索引大于结束列,这里获取距离后面数据的宽度
        right += col.renderWidth//距离表格整体右侧边框距离,加上当前列
      }
      if (startColumnIndex <= index && index <= endColumnIndex) {//开始列索引大于数据索引 和 结束列索引小于数据索引,这里获取选中区域的宽度
        width += col.renderWidth//选中区域的宽度
      }
    } else {//从右往左选择
      if (index < endColumnIndex) {
        left += col.renderWidth//距离表格整体左侧边框距离
      }
      if (index > startColumnIndex) {//数据索引大于开始列,这里获取距离后面数据的宽度
        right += col.renderWidth//距离表格整体右侧边框距离,加上当前列
      }
      if (startColumnIndex >= index && index >= endColumnIndex) {//开始列索引大于数据索引 和 结束列索引小于数据索引,这里获取选中区域的宽度
        width += col.renderWidth//选中区域的宽度
      }
    }
  })
  if (startRowIndex <= endRowIndex) {//开始行索引小于结束行索引,即从上往下选择
    height = (endRowIndex - startRowIndex + 1) * gridOptions.rowConfig.height//选中区域的高度
    top = startRowIndex * gridOptions.rowConfig.height//距离表格整体顶部边框距离
  } else {
    height = (startRowIndex - endRowIndex + 1) * gridOptions.rowConfig.height//选中区域的高度
    top = endRowIndex * gridOptions.rowConfig.height//距离表格整体顶部边框距离
  }
  return { width, height, left, top, right }

}

//显示范围框
const openAreaBox = () => {
  let element = xGrid.value.$el.querySelector(".vxe-table--main-wrapper .vxe-table--body-wrapper .vxe-table--cell-area")
  if (element) {
    element.style.display = "block"
  }
  element = xGrid.value.$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper .vxe-table--cell-area")
  if (element) {
    element.style.display = "block"
  }
  element = xGrid.value.$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-right-wrapper .vxe-table--body-wrapper .vxe-table--cell-area")
  if (element) {
    element.style.display = "block"
  }
}

//表格外销毁范围框
const tableOutDestroyAreaBox = (event) => {
  let element = getTablexGrid().$el.querySelector(".vxe-table--render-wrapper")
  if (element) {
    if (event.clientX < element.getBoundingClientRect().left || event.clientX > element.getBoundingClientRect().right
        || event.clientY > element.getBoundingClientRect().top || event.clientY < element.getBoundingClientRect().bottom
    ) {
      destroyAreaBox()
    }
  }


}

//销毁范围框
const destroyAreaBox = () => {
  let element = getTablexGrid().$el.querySelector(".vxe-table--main-wrapper .vxe-table--body-wrapper .vxe-table--cell-area")
  if (element) {
    console.log(element)
    element.style.display = "none"
  }
  element = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper .vxe-table--cell-area")
  if (element) {
    element.style.display = "none"
  }
  element = getTablexGrid().$el.querySelector(".vxe-table--fixed-wrapper .vxe-table--fixed-right-wrapper .vxe-table--body-wrapper .vxe-table--cell-area")
  if (element) {
    element.style.display = "none"
  }
}

//表格单元格点击事件
const tableCellClick = (e) => {
  console.log(e.target,'target')
  if (!isSelecting.value) {//非选中状态
    try {
      selectionStart = getCellPosition(e.target)//获取单元格位置
      selectionEnd = selectionStart//结束位置也是自己
      //设置样式
      setselectedCellArea()
    } catch (error) {

    }

  }

}

//表格右键点击事件
const tableCellMenuClick = (e) => {
  console.log('右键')
  if (!isSelecting.value) {//非选中状态
    let currentCellPosition = getCellPosition(e.target)//获取单元格位置
    var horizontalFlag//是否在范围框的水平判断标记
    var verticalFlag//是否在范围框的垂直判断标记
    if (selectionStart.cellIndex <= selectionEnd.cellIndex) {//如果是从左往右选取
      horizontalFlag = selectionStart.cellIndex <= currentCellPosition.cellIndex && currentCellPosition.cellIndex <= selectionEnd.cellIndex
    } else {//从右往左选取
      horizontalFlag = selectionEnd.cellIndex <= currentCellPosition.cellIndex && currentCellPosition.cellIndex <= selectionStart.cellIndex
    }
    if (selectionStart.rowIndex <= selectionEnd.rowIndex) {//如果是从上往下选取
      verticalFlag = selectionStart.rowIndex <= currentCellPosition.rowIndex && currentCellPosition.rowIndex <= selectionEnd.rowIndex
    } else {//从下往上选取
      verticalFlag = selectionEnd.rowIndex <= currentCellPosition.rowIndex && currentCellPosition.rowIndex <= selectionStart.rowIndex
    }

    if (horizontalFlag && verticalFlag) { //判断如果不在选中区域内,触发表格左键单击事件,更新截取单元格,否则如果在正常触发右键菜单

    } else {
      selectionStart = getCellPosition(e.target)//获取单元格位置
      selectionEnd = selectionStart//结束位置也是自己
      //设置样式
      setselectedCellArea()
    }

  }
}


// 辅助
const toolbarButtonClickEvent = ({ code }) => {
  switch (code) {
    case "getcellselctdata":
      //我给大家打印处理:
      console.log("是否正在进行滑动选中操作：", isSelecting.value)
      //左上角坐标
      console.log("单元格起始位置：索引:", selectionStart)
      //右下角坐标
      console.log("单元格结束位置：索引:", selectionEnd)


      //这里需要是visibleData
      let tableData = getTablexGrid().getTableData().visibleData//获取处理条件之后的全量表体数据
      let rowStart = selectionStart.rowIndex//获取选中起始行索引
      let rowEnd = selectionEnd.rowIndex//获取选中结束行索引
      let selectRows = tableData.filter((col, index) => {//col参数不能改否则会获取不到数据
        //这里修改从右下往左上拖动的数据显示
        if (rowStart <= rowEnd) {
          return rowStart <= index && rowEnd >= index
        } else {
          return rowStart >= index && rowEnd <= index
        }
      })
      console.log("鼠标选中行:", JSON.stringify(selectRows))

      //这里需要是visibleColumn
      let colStart = selectionStart.cellIndex//获取选中起始列索引
      let colEnd = selectionEnd.cellIndex//获取选中结束列索引
      let tableColumn = getTablexGrid().getTableColumn().visibleColumn//获取处理条件之后的全量表头列
      let selectCols = tableColumn.filter((col, index) => {//col参数不能改否则会获取不到数据
        //这里修改从右下往左上拖动的数据显示
        if (colStart <= colEnd) {
          return colStart <= index && colEnd >= index
        } else {
          return colStart >= index && colEnd <= index
        }
      })
      let colList = [];
      for(let col of selectCols){
        colList.push(col.field)
      }
      for(let item of selectRows){
        let proxyItem = reactive({});
        let itemArr = Object.keys(item);
        for(let attr of itemArr){
          for(let key of colList){
            if(attr === key){
              proxyItem[attr] =  item[attr]
            }
          }
        }
        copyData.push(proxyItem);
      }
      break;
  }
}

//#endregion
</script>

<style scoped>
.vxe-grid{
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
</style>
