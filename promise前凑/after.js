// 词法作用域
// js的执行过程 AO
function after(times, callback) {
  // 闭包
  //   AO={times}
  return function(params) {
    if (--times === 0) {
      callback()
    }
  }
}

let fn = after(3, function(params) {
  // 真正执行的函数
  console.log('really')
})
fn()
fn()
fn()
