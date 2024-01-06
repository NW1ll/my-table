// 对象池单例函数 - 核心
const objectPoolFactory = function (fn) {
  const pool = []
  return {
    create (...args) {
      const obj = (pool.length === 0) ? fn.apply(this, args) : pool.shift()
      return obj
    },
    recover (obj) {
      pool.push(obj)
    }
  }
}
// 创建 dom 节点函数
const  createDomFactory = objectPoolFactory(() => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return div
})

// 用于演示回收，实际项目不需要
const arr = []
// 地图查询渲染
const search = (data) => {
  data.forEach((x) => {
    const div = createDomFactory.create()
    div.innerHTML = x
    arr.push(div)
  })
}

// 通过每次的搜索从接口获取数据并渲染(频繁添加和删除DOM)
const searchData1 = ['山西', '山东', '岐山', '山姆超市']
search(searchData1)
// 到这里页面显示山西、山东、岐山、山姆超市
// 接下来假设我们已经使用完了上述信息，那么我们可以进行回收，渲染下一组
arr.forEach(x => {
  createDomFactory.recover(x)
})
const searchData2 = ['广州', '广西', '广东', '广寒宫']
search(searchData2)
// 到这里页面不再显示山西、山东、岐山、山姆超市
