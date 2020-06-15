// 查找文件夹中最大的文件 非promise和promise

let fs = require('fs')
let path = require('path')

function findMaxFileSize(dir, callback) {
  //
  fs.readdirSync(dir, (err, files) => {
    if (err) {
      return callback(err) // 读取文件目录出错了
    }
    let count = files.length // 文件个数
    let isError = false // 是否读取内容出错了 锁
    let fileInfoList = [] // 已读取文件信息列表
  })
}
