// vue 特点 数据变化   更新视图 ，监听数据变化,数据变化后更新视图

class Subject {
  // 被观察者
  constructor() {
    this.state = 1
    this.arr = []
  }
  attach(o) {
    this.arr.push(o)
  }
  setSate(newSate) {
    this.state = newSate
    this.arr.forEach(o => o.update(newSate))
  }
}

class Observer {
  // 观察者
  constructor(name) {
    this.name = name
  }
  update(newSate) {
    console.log(this.name + ':' + newSate)
  }
}

// function Observer(name) {
//   this.name = name
// }
// Observer.prototype.update = function (newdate) {
//   console.log(this.name + ':' + newSate)
// }

let s = new Subject('baby')
let o1 = new Subject('me')
let o2 = new Subject('friend')
s.attach(o2) // 添加到自己数组存起来
s.attach(o1) // 添加到自己数组存起来
s.setSate(2) // 更新状态
s.setSate(3) // 更新状态
