// 词法作用域   珠峰  姜文老师
// js的执行过程 AO

// 通过回调函数来解决 after函数
function after(times, cb) {
  let school = {}
  return function (key, value) {
    Object.assign(school, { key: value })
    if (--times == 0) {
      cb(school)
    }
  }
}

let out = after(2, function (result) {
  // 公用异步处理方式
  console.log(result)
})

let fs = require('fs')
// 并发
fs.readerFile('./after.js', 'utf8', function (err, data) {
  out('name', data)
})
fs.readerFile('./callback1.js', 'utf8', function (err, data) {
  out('age', 10)
})
