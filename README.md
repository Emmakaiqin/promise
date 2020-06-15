## 手写 promise

## promise：优缺点

### 优点

1，可以解决异步嵌套问题；2，可以解决多个异步并发问题

### 缺点

1，基于回调的；2，无法终止

### 1）promise 三个状态 pending,resolved,rejected

#### 检验自己的 promise 是否符合 Promise/A+标准

1. 安装插件 promises-aplus-tests ;

2. promise 需要写:

Promise.deferred = function() {
// 减少嵌套
let dfd = {}
dfd.promise = new Promise((resolve, reject) => {
dfd.resolve = resolve
dfd.reject = reject
})
return dfd
}

3. npx promises-aplus-tests "所写的 promise 文件目录"
   或者 配置
   "scripts": {
   "test": "promises-aplus-tests ./promise1.2.js "
   }
   npm run test 便可
