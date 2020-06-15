// Promise:对象或者函数实现

// then
// 1)then中传递的函数,判断成功和失败函数的返回结果
// 2)判断是不是promise,是promise,就采用他的状态
// 3)如果不是promise,直接将结果传递下去

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise, x, resolve, reject) => {
  // 兼容所有的promise
  if (promise === x) {
    // 我在等着自己出去买东西回来   死循环了
    return reject(new TypeError('cannot return the same promise object from onfulfilled or on rejected callback.')) // 类型错误
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // if (x instanceof Object) { // 这个为撒会报错
    // typeof 基本数据类型
    // constructor 构造函数
    // instanceof 谁是谁的实例
    // toString 无法判断实例
    let called
    try {
      let then = x.then // 取then可能出错,有可能这个属性通过defineProperty定义的
      if (typeof then === 'function') {
        // 当前有then,姑且当你是个promise
        then.call(
          x,
          val => {
            // y可能还是个promise,知道解析出来的值是个普通值
            if (called) {
              // 调用过一次
              return
            }
            called = true
            resolvePromise(promise, val, resolve, reject)
          },
          err => {
            if (called) {
              // 调用过一次
              return
            }
            called = true
            reject(err)
          }
        ) // 能保证不用再次取then的值
      } else {
        resolve(x) // x是普通对象
      }
    } catch (error) {
      if (called) {
        // 调用过一次
        return
      }
      called = true
      reject(error)
    }
  } else {
    // 普通值
    resolve(x) // 走成功
  }
}
class Promise {
  // 1,看这个属性能否在原型上使用
  // 2,看属性是否公用
  constructor(executor) {
    this.status = PENDING // 状态 // 实例上的属性
    this.value = undefined // 成功的值 // 实例上的属性
    this.reason = undefined // 失败的原因 // 实例上的属性
    this.onResolveCallback = [] // 成功的回调 存起来
    this.onRejectCallback = [] // 失败的回调 // 存起来
    // 成功函数
    let resolve = value => {
      // 私有方法  屏蔽外实例部调用
      if (this.status === PENDING) {
        // 状态改变后不可改变
        this.value = value
        this.status = RESOLVED // 改变状态
        this.onResolveCallback.forEach(fn => fn && fn()) // 执行存的回调
      }
    }
    // 失败函数
    let reject = reason => {
      // 私有方法  屏蔽外实例部调用
      if (this.status === PENDING) {
        // 状态改变后不可改变
        this.reason = reason
        this.status = REJECTED // 改变状态
        this.onRejectCallback.forEach(fn => fn && fn()) // 执行存的回调
      }
    }
    try {
      executor && executor(resolve, reject) // 执行器 默认立即执行
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected 可选参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err
          }
    // 原型上的
    // 俩参数
    // 同步
    //  每次then新建一个实例,返回新的结果,这样then后面可以一直有then
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          // 宏任务 // 微任务  // 还在new,无法获取到promise2
          try {
            // 异步错误外部无法获取
            let h = onFulfilled(this.value)
            resolvePromise(promise2, h, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // 异步错误外部无法获取
            let h = onRejected(this.reason)
            resolvePromise(promise2, h, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      // 异步
      if (this.status === PENDING) {
        // 发布订阅
        this.onResolveCallback.push(() => {
          setTimeout(() => {
            try {
              let h = onFulfilled(this.value)
              resolvePromise(promise2, h, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectCallback.push(() => {
          setTimeout(() => {
            try {
              let h = onRejected(this.reason)
              resolvePromise(promise2, h, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}

Promise.defer = Promise.deferred = function() {
  // 减少嵌套
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

// 测试promise规范 promises-aplus-tests
// npx promises-aplus-tests promise.js
module.exports = Promise
