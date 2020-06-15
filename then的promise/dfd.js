let Promise = require('./promise1.2')

let fs = require('fs')
function read(url) {
  let dfd = Promise.defer() // 避免嵌套的方法
  fs.readFile(url, 'utf-8', (err, data) => {
    if (err) {
      dfd.reject(err)
    } else {
      dfd.resolve(data)
    }
  })
  return dfd.promise
}
