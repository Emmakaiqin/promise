// 词法作用域   珠峰  姜文老师
// js的执行过程 AO
// 发布订阅模式 发布emit 订阅on
// 另外一个模式：观察者模式（有关系，基于发布定于关系）
let event = {
  _arr: [],
  on(fn) {
    this._arr.push(fn)
  },
  emit() {
    console.log(this._arr)
    this._arr.forEach(fn => fn())
  },
}

let school = {}

// event.on(function () {
//   // 这个函数不能立即执行
//   console.log('读取一个')
// })
event.on(() => {
  // 这个函数不能立即执行
  console.log('读取一个')
  if (Object.keys(school).length === 2) {
    console.log(2)
  }
})

let fs = require('fs')
// 并发
fs.readFile('./after.js', 'utf8', (err, data) => {
  school.name = data
  event.emit()
})
fs.readFile('./callback1.js', 'utf8', (err, data) => {
  school.age = data
  event.emit()
})
