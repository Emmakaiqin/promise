// AOP 面向切片编程 把一些与核心业务代码无关的代码抽离出来
function perform(anymethod, wrappers) {
  return function () {
    wrappers.forEach((wrapper) => {
      wrapper.initialize()
    })
    anymethod()
    wrappers.forEach((wrapper) => {
      wrapper.close()
    })
  }
}

let newFn = perform(
  function name() {
    console.log('say')
  },
  [
    {
      // wrapppr1
      initialize() {
        console.log('1')
      },
      close() {
        console.log('close')
      },
    },
    {
      // wrapppr2
      initialize() {
        console.log('2')
      },
      close() {
        console.log('close')
      },
    },
    {
      // wrapppr3
      initialize() {
        console.log('3')
      },
      close() {
        console.log('close')
      },
    },
  ]
)
