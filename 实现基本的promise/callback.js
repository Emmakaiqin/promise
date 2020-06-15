// promise的特点
// promise是一个类

// 1)三个状态, 等待(默认) 成功 失败  一旦改变不可修改
// resolve 成功  reject失败
// 2)每个promise实例都有一个then方法
// 3)如果new Promise的时候报错了,会变成失败态(抛错也算失败)
let promise = new Promise((resolve, reject) => {
  // executor 执行器
  //   throw new Error('reject') 报错也算失败
  console.log(1)
  resolve('hello')
  reject('reject')
  console.log(2)
})
// .then(
//   res => {
//     console.log('then:', res)
//     return res
//   },
//   err => {
//     console.log('err:', err)
//     return err
//   }
// )
console.log('out', promise)
promise.then(
  res => {
    console.log('then:', res)
  },
  err => {
    console.log('err:', err)
  }
)
