// Promise:对象或者函数实现

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

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
      console.log('resolve begin', value)
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
      console.log('executor:', executor)
      executor && executor(resolve, reject) // 执行器 默认立即执行
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    console.log('then begin', onFulfilled, onRejected)
    // 原型上的
    // 俩参数
    // 同步
    if (this.status === RESOLVED) {
      console.log('then RESOLVED')
      onFulfilled && onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      console.log('then REJECTED')
      onRejected && onRejected(this.reason)
    }
    // 异步
    if (this.status === PENDING) {
      console.log('then PENDING')
      // 发布订阅
      this.onResolveCallback.push(() => {
        console.log('then PENDING onResolveCallback push')
        onFulfilled
      })
      this.onRejectCallback.push(() => {
        console.log('then PENDING onResolveCallback push')
        onRejected
      })
    }
  }
}
module.exports = Promise
