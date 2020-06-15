// 回调函数是高阶函数的一种
// 高阶函数 1:如果函数的参数是一个函数，2:如果一个函数返回了一个函数（返回函数就是高阶函数）

//  常见的高阶函数的应用
// 有一个核心功能

// AOP 面向切片编程
function say() {
  // todo
  console.log('21313')
}

Function.prototype.before = function(beforeFunction) {
  // this指向调用者
  // let that=this
  // retrun function () {    // newFn
  //     beforeFunction()
  //     that()
  // }

  return (...args) => {
    // 箭头函数没有this，没有arguments，没有原型 this就网上找
    // ...args:剩余算符传值，将所有参数组合成一个数组，只有最后一个参数可以用这个
    beforeFunction()
    this(...args)
  }
}

let newFn = say.before(function() {
  // ...
  console.log('newFn')
})

newFn()

// 什么叫闭包 （作用域产生 根据函数定义的位置，执行上下文）

// 函数劫持 aop
// 在调用push方法时，触发一句更新
let oldPush = Array.prototype.push
function push(...args) {
  console.log('befroe')
  oldPush.call(this, ...args) // call:1，改变this指向；2，让函数执行
}
push.call([1, 2, 3], 4, 5, 6, 7)
