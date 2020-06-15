// then 的用法

// 1)三个状态, 等待(默认) 成功 失败  一旦改变不可修改
// resolve 成功  reject失败
// 2)每个promise实例都有一个then方法
// 3)如果new Promise的时候报错了,会变成失败态(抛错也算失败)

// 如果一个promise的then方法中的函数(成功或者失败)返回的结果是一个promise的话,会自动将这个promise执行,并且采用它的状态,如果成功会将成功结果向外层的下一个then传递.

let fs = require('fs')

// 要分段读取,第一个的输出是第二个的输入
// 1)丑,不好维护 2)异步错误处理不能同意
// fs.readFile('./promise1.2.js', 'utf8', (err, data) => {
//   fs.readFile('./callback.js', 'utf8', (err, data) => {})
// })
let Promise = require('./promise1.2')
const path = require('path')
// promise实现
function read(url) {
  return new Promise((res, rej) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) {
        rej(err)
      }
      res(data)
    })
  })
}

read('./promise1.2.js')
  .then(
    data => {
      console.log(1)
      return read('./callback2.js')
    },
    err => {
      console.log(err)
    }
  )
  .then(
    data => {
      console.log('2 then ')
    },
    err => {
      console.log('2 err ', err)
      return undefined // 没返回默认就是undefined,非promise值为成功的结果
    }
    // 希望不走后面的then return new Promise(()=>{})  // pending的promise
  )
  .then(
    data => {
      console.log('3 then ')
    },
    err => {
      console.log('3 err ', err)
    }
  )

// 只有两种情况会失败,返回一个失败的promise和抛出异常
// 每次执行promise的时候,都会返回一个新的promise

let newP = new Promise((resolve, reject) => {
  resolve(123)
})
newP.then().then(data => {
  console.log('newP', data)
})
