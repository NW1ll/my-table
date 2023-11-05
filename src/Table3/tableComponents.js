import {computed, h, reactive, ref, toRefs} from "vue";
import flyweight from "@/FlyWeight";
import "./dev-index.css";

export default {
  name: "TableComponent",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    colTypes: {
      type: Array,
      required: false,
    },
    flyweight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { slots }) {
    let isDragging = ref(false);
    let startRow = ref(null);
    let startCol = ref(null);
    let endRow = ref(null);
    let endCol = ref(null);
    let contextMenuVisible = ref(false);
    // let contextMenuTop = ref(0);
    // let contextMenuLeft = ref(0);
    let select = reactive([]);
    let copyData = reactive([]);
    let selectedCells = reactive([]);
    let divDragging = ref(false);
    let changed = reactive([]);
    let allowEdit = reactive(new Map());
    let T = toRefs(props.colTypes);
    let makeDiff = reactive([]);
    const len = T.length;
    const pasteByRule = ref(true);
    let height = ref(0);
    let left = ref(0);
    let width = ref(0);
    // let lastWidth = ref(0);

    // // lastWidth消亡次数
    // let i = ref(2);

    const calculateLeft = (target) => {
      if(!target) return 0;
      let res = 0;
      while (target){
        res += target.offsetWidth
        target = target.previousElementSibling
      }
      return res;
    }

    const handleMouseDown = (row, col) => {
      if (event.button === 0) {
        if (event.target.localName === "div") {
          divDragging.value = true;
        }
        isDragging.value = true;
        // console.log("zuo", props.rows);
        // Set the startRow, startCol, endRow and endCol properties

        left = calculateLeft(event.target.previousElementSibling);
        height = event.target.offsetHeight;
        width = event.target.offsetWidth;
        startRow.value = row;
        startCol.value = col;
        endRow.value = row;
        endCol.value = col;
        // if(i.value === 0){
        //   lastWidth = 0;
        // }
        // if(i.value >= 0){
        //   i.value--;
        // }
        // console.log(i.value)

        select.splice(0, select.length);
        selectedCells.splice(0, selectedCells.length);
        // Add the clicked cell to the selectedCells array
        selectedCells.push({ row, col });
        select.push({ row, col });
      }
    };

    function throttled(fn, delay = 100) {
      let oldtime = Date.now();
      return function (...args) {
        let newtime = Date.now();
        if (newtime - oldtime >= delay) {
          fn.apply(null, args);
          oldtime = Date.now();
        }
      };
    }

    let oldCol = 0;
    let wid = 0

    const calculateWith = (target,row,col) => {
      // 距离来判断
      console.log(col)
      if(oldCol < col){
        wid += target.offsetWidth
        oldCol = col;
      }else if(oldCol > col) {
        wid -= target.nextElementSibling.offsetWidth
        oldCol = col;
      }
      console.log(wid)
      return wid
    }

    const MouseMove = (row, col) => {

      // 拖动启动div启动赋值功能
      if (isDragging.value && divDragging.value) {
        // copydata 分开
        endRow.value = row;
        endCol.value = col;
        // 清除之前选中的单元格
        selectedCells.splice(0, selectedCells.length);
        // changed.splice(0,changed.length)
        let firstRow, firstCol, Len, value;
        // Calculate the range of cells that should be selected

        // 获取赋值的选中单元格
        for (
          let i = Math.min(startRow.value, endRow.value);
          i <= Math.max(startRow.value, endRow.value);
          i++
        ) {
          selectedCells.push({ row: i, col: col });
          firstRow = selectedCells[0].row;
          firstCol = selectedCells[0].col;
          Len = selectedCells.length;
          value = props.rows[firstRow][props.columns[firstCol].field];
        }

        const diff = makeDiff[1] - makeDiff[0];
        if (pasteByRule.value && makeDiff.length) {
          for (let i = 1; i < Len; i++) {
            let row = firstRow + i;
            let col = firstCol;
            changed.push({ row, col });
            // eslint-disable-next-line vue/no-mutating-props
            props.rows[firstRow + i][props.columns[firstCol].field] =
              Number(value) + (i + 1) * diff;
          }
        } else {
          for (let i = 0; i < Len; i++) {
            if (
              props.rows[firstRow + i][props.columns[firstCol].field] !== value
            ) {
              let row = firstRow + i;
              let col = firstCol;
              changed.push({ row, col });
            }
            // eslint-disable-next-line vue/no-mutating-props
            props.rows[firstRow + i][props.columns[firstCol].field] = value;
          }
        }
        //选取区域
      } else if (isDragging.value) {
        // Update the endRow and endCol properties
        endRow.value = row;
        endCol.value = col;
        // Clear the selectedCells array
        selectedCells.splice(0, selectedCells.length);
        width = calculateWith(event.target,row,col) !== 0 ? calculateWith(event.target,row,col) : event.target.offsetWidth;
        // lastWidth = width;
        height = event.target.offsetHeight;
        // Calculate the range of cells that should be selected
        for (
          let i = Math.min(startRow.value, endRow.value);
          i <= Math.max(startRow.value, endRow.value);
          i++
        ) {
          for (
            let j = Math.min(startCol.value, endCol.value);
            j <= Math.max(startCol.value, endCol.value);
            j++
          ) {
            selectedCells.push({ row: i, col: j });
          }
        }
        let pObj = selectedCells.pop();
        select[0] = pObj;
        selectedCells.push(pObj);
      }
    };
    const handleMouseMove = throttled(MouseMove, 100);

    const handleMouseUp = () => {
      wid = 0;
      oldCol = 0;
      divDragging.value = false;
      isDragging.value = false;
      startRow.value = null;
      startCol.value = null;
      endRow.value = null;
      endCol.value = null;
    };

    const isSelected = (row, col) => {
      return selectedCells.some(function (cell) {
        return cell.row === row && cell.col === col;
      });
    };

    const handleClick = (rowIndex, colIndex) => {
      contextMenuVisible.value = false;
      if (!allowEdit.has(`${rowIndex}${colIndex}`)) {
        allowEdit.clear();
      }
      //作用域插槽，传值
    };

    const handleDbclick = (rowIndex, colIndex) => {
      if (!allowEdit.get({ rowIndex, colIndex })) {
        allowEdit.set(`${rowIndex}${colIndex}`, true);
      }
    };

    const handleContextMenu = (event) => {
      contextMenuVisible.value = true;

      // 获取鼠标点击的位置
      const x = event.clientX;
      const y = event.clientY;
      console.log(x, y);
      // 获取点击的元素
      // const target = event.target;

      // 计算菜单的位置
      // const rect = target.getBoundingClientRect();
      contextMenuTop.value = y;
      contextMenuLeft.value = x;
      // 阻止默认的右键菜单
      event.preventDefault();
    };
    const copyCells = () => {
      let initRow = selectedCells[0].row,
        initCol = selectedCells[0].col;
      let len = selectedCells.length;
      let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
      console.log(width, len);
      let copydata = new Array(width)
        .fill("")
        .map(() => new Array(Math.floor(len / width)).fill(""));
      selectedCells.forEach((item) => {
        let rowIndex = item.row;
        let colIndex = item.col;
        copydata[rowIndex - initRow][colIndex - initCol] =
          props.rows[rowIndex][props.columns[colIndex].field];
      });
      copyData = copydata;

      contextMenuVisible.value = false;
      // 复制所选中的单元格
      // ...
    };
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        let initRow = selectedCells[0].row,
          initCol = selectedCells[0].col;
        let len = selectedCells.length;
        let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
        console.log(width, len);
        let copydata = new Array(width)
          .fill("")
          .map(() => new Array(Math.floor(len / width)).fill(""));
        selectedCells.forEach((item) => {
          let rowIndex = item.row;
          let colIndex = item.col;
          copydata[rowIndex - initRow][colIndex - initCol] =
            props.rows[rowIndex][props.columns[colIndex].field];
        });
        makeDiff = copydata;
      }
      console.log("keydown");
      if (event.ctrlKey && event.key === "c") {
        let initRow = selectedCells[0].row,
          initCol = selectedCells[0].col;
        let len = selectedCells.length;
        let width = selectedCells[len - 1].row - selectedCells[0].row + 1;
        let copydata = new Array(width)
          .fill("")
          .map(() => new Array(Math.floor(len / width)).fill(""));
        selectedCells.forEach((item) => {
          let rowIndex = item.row;
          let colIndex = item.col;
          copydata[rowIndex - initRow][colIndex - initCol] =
            props.rows[rowIndex][props.columns[colIndex].field];
        });
        copyData = copydata;
        console.log(copyData);
      } else if (event.ctrlKey && event.key === "v") {
        let rowIndex = selectedCells[0].row,
          colIndex = selectedCells[0].col;
        for (let i = 0; i < copyData.length; i++) {
          for (let j = 0; j < copyData[0].length; j++) {
            if(props.rows[i + rowIndex][props.columns[j + colIndex].field] !==
              copyData[i][j]){
// eslint-disable-next-line vue/no-mutating-props
              props.rows[i + rowIndex][props.columns[j + colIndex].field] =
                copyData[i][j];
              changed.push({ row: i + rowIndex, col: j + colIndex });
            }
          }
        }
      }
    };

    const pasteCells = () => {
      let rowIndex = selectedCells[0].row,
        colIndex = selectedCells[0].col;
      for (let i = 0; i < copyData.length; i++) {
        for (let j = 0; j < copyData[0].length; j++) {
          // eslint-disable-next-line vue/no-mutating-props
          props.rows[i + rowIndex][props.columns[j + colIndex].field] =
            copyData[i][j];
          selectedCells.push({ row: i + rowIndex, col: j + colIndex });
        }
      }
    };

    const isSelectedOne = (row, col) => {
      return select.some(function (cell) {
        return cell.row === row && cell.col === col;
      });
    };

    const isChanged = (row, col) => {
      return changed.some(function (cell) {
        return cell.row === row && cell.col === col;
      });
    };

    const selectionBounds = computed(() => {
      if (selectedCells.length === 0) {
        return null;
      }
      const minRow = Math.min(
        ...selectedCells.map((cell) => cell.row)
      );
      const maxRow = Math.max(
        ...selectedCells.map((cell) => cell.row)
      );
      const minCol = Math.min(
        ...selectedCells.map((cell) => cell.col)
      );
      const maxCol = Math.max(
        ...selectedCells.map((cell) => cell.col)
      );
      return {
        minRow,
        maxRow,
        minCol,
        maxCol,
      };
    });

    const getSelectionStyle = (bounds,left,height,width) =>{
      // width = lastWidth || width; 保存复制之前的区域宽度
      // console.log(lastWidth,width)
      //TODO 通过剪切板状态判断是否使用lastWidth，从而设置粘贴后区域样式
      //TODO 通过剪切板状态启用新的边框样式
      return {
        top: bounds.value.minRow * height + 47 +"px",
        left:  left + "px",
        width: width + "px",
        height: (bounds.value.maxRow - bounds.value.minRow + 1) * height + "px",
      };
    };


    const headers = props.columns.map((column) => {
      return h("th", column.title);
    });

    return () =>
      h(
        "div",
        {
          tabindex: "-1",
          onKeydown: handleKeyDown,
          style: {
            outline: "none",
          },
        },
        [
          h("table", { class: ["pure-table", "pure-table-bordered"],
            onMouseup: () => handleMouseUp(),}, [
            h("thead", {}, [h("tr", headers)]),
            h("tbody", {}, [
              props.rows.map((row, rowIndex) => {
                return h("tr", {}, [
                  props.columns.map((col, colIndex) => {
                    if (0 < len && col.type === T[0].value) {
                      let type = T[0].value;
                      return h(
                        "td",
                        {
                          class: [
                            { selected: isSelected(rowIndex, colIndex) },
                            "divSelect",
                          ],
                          onDblclick: () => handleDbclick(rowIndex, colIndex),
                          onClick: () => handleClick(rowIndex, colIndex),
                          onMousedown: () =>
                            handleMouseDown(rowIndex, colIndex),
                          onMousemove: () =>
                            handleMouseMove(rowIndex, colIndex),
                        },
                        [
                          allowEdit.get(`${rowIndex}${colIndex}`) && slots[type]
                            ? slots[type]({
                                row: row,
                              })
                            : props.flyweight
                            ? flyweight.getFlyweight(row[col.field])
                            : row[col.field],
                          h("div", {
                            class: {
                              selectedOne: isSelectedOne(rowIndex, colIndex),
                            },
                            onMousedown: () =>
                              handleMouseDown(rowIndex, colIndex),
                          }),
                          h("div", {
                            class: {
                              selectedChange: isChanged(rowIndex, colIndex),
                            },
                          }),
                        ]
                      );
                    } else if (1 < len && col.type === T[1].value) {
                      let type = T[1].value;
                      return h(
                        "td",
                        {
                          class: [
                            { selected: isSelected(rowIndex, colIndex) },
                            "divSelect",
                          ],
                          onDblclick: () => handleDbclick(rowIndex, colIndex),
                          onClick: () => handleClick(rowIndex, colIndex),
                          onMousedown: () =>
                            handleMouseDown(rowIndex, colIndex),
                          onMousemove: () =>
                            handleMouseMove(rowIndex, colIndex),
                        },
                        [
                          allowEdit.get(`${rowIndex}${colIndex}`) && slots[type]
                            ? slots[type]({
                                row: row,
                              })
                            : props.flyweight
                            ? flyweight.getFlyweight(row[col.field])
                            : row[col.field],
                          h("div", {
                            class: {
                              selectedOne: isSelectedOne(rowIndex, colIndex),
                            },
                            onMousedown: () =>
                              handleMouseDown(rowIndex, colIndex),
                          }),
                          h("div", {
                            class: {
                              selectedChange: isChanged(rowIndex, colIndex),
                            },
                          }),
                        ]
                      );
                    } else if (2 < len && col.type === T[2].value) {
                      let type = T[2].value;
                      return h(
                        "td",
                        {
                          class: [
                            { selected: isSelected(rowIndex, colIndex) },
                            "divSelect",
                          ],
                          onDblclick: () => handleDbclick(rowIndex, colIndex),
                          onClick: () => handleClick(rowIndex, colIndex),
                          onMousedown: () =>
                            handleMouseDown(rowIndex, colIndex),
                          onMousemove: () =>
                            handleMouseMove(rowIndex, colIndex),
                        },
                        [
                          allowEdit.get(`${rowIndex}${colIndex}`) && slots[type]
                            ? slots[type]({
                                row: row,
                              })
                            : props.flyweight
                            ? flyweight.getFlyweight(row[col.field])
                            : row[col.field],
                          h("div", {
                            class: {
                              selectedOne: isSelectedOne(rowIndex, colIndex),
                            },
                            onMousedown: () =>
                              handleMouseDown(rowIndex, colIndex),
                          }),
                          h("div", {
                            class: {
                              selectedChange: isChanged(rowIndex, colIndex),
                            },
                          }),
                        ]
                      );
                    } else if (3 < len && col.type === T[3].value) {
                      let type = T[3].value;
                      return h(
                        "td",
                        {
                          class: [
                            { selected: isSelected(rowIndex, colIndex) },
                            "divSelect",
                          ],
                          onDblclick: () => handleDbclick(rowIndex, colIndex),
                          onClick: () => handleClick(rowIndex, colIndex),
                          onMousedown: () =>
                            handleMouseDown(rowIndex, colIndex),
                          onMousemove: () =>
                            handleMouseMove(rowIndex, colIndex),
                        },
                        [
                          allowEdit.get(`${rowIndex}${colIndex}`) && slots[type]
                            ? slots[type]({
                                row: row,
                              })
                            : props.flyweight
                            ? flyweight.getFlyweight(row[col.field])
                            : row[col.field],
                          h("div", {
                            class: {
                              selectedOne: isSelectedOne(rowIndex, colIndex),
                            },
                            onMousedown: () =>
                              handleMouseDown(rowIndex, colIndex),
                          }),
                          h("div", {
                            class: {
                              selectedChange: isChanged(rowIndex, colIndex),
                            },
                          }),
                        ]
                      );
                    } else if (4 < len && col.type === T[4].value) {
                      let type = T[4].value;
                      return h(
                        "td",
                        {
                          class: [
                            { selected: isSelected(rowIndex, colIndex) },
                            "divSelect",
                          ],
                          onDblclick: () => handleDbclick(rowIndex, colIndex),
                          onClick: () => handleClick(rowIndex, colIndex),
                          onMousedown: () =>
                            handleMouseDown(rowIndex, colIndex),
                          onMousemove: () =>
                            handleMouseMove(rowIndex, colIndex),
                        },
                        [
                          allowEdit.get(`${rowIndex}${colIndex}`) && slots[type]
                            ? slots[type]({
                                row: row,
                              })
                            : props.flyweight
                            ? flyweight.getFlyweight(row[col.field])
                            : row[col.field],
                          h("div", {
                            class: {
                              selectedOne: isSelectedOne(rowIndex, colIndex),
                            },
                            onMousedown: () =>
                              handleMouseDown(rowIndex, colIndex),
                          }),
                          h("div", {
                            class: {
                              selectedChange: isChanged(rowIndex, colIndex),
                            },
                          }),
                        ]
                      );
                    }
                  }),
                ]);
              }),
            ]), //尝试添加式
            selectionBounds.value ? h('div',{
              class:['selected-region'],
              style:getSelectionStyle(selectionBounds,left,height,width)
            }) : ''
          ]),
        ]
      );
  },
}; //操作单元格的使用运用享元模式
