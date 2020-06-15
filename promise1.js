// 1,We have a problem with promises
// https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

// 2,Taming the asynchronous beast with ES7
// https://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html

// Promise.all is good for executing many promises at once
Promise.all([promise1, promise2])

// Promise.resolve is good for wrapping synchronous code
Promise.resolve().then(() => {
  if (somethingIsNotRight()) {
    throw new Error('I will be rejected asynchronously!')
  } else {
    return 'This string will be resolved asynchronously!'
  }
})

// execute some promises one after the other.
// this takes an array of promise factories, i.e.
// an array of functions that RETURN a promise
// (not an array of promises themselves; those would execute immediately)
function sequentialize(promiseFactories) {
  let chain = Promise.resolve()
  promiseFactories.forEach(promiseFactory => {
    chain = chain.then(promiseFactory)
  })
  return chain
}

// Promise.race is good for setting a timeout:
Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(reject, 10000) // timeout after 10 secs
  }),
  doSomethingThatMayTakeAwhile(),
])

// Promise finall util similar to Q.finally
// e.g. promise.then(...).catch().then(...).finally(...)
function finall(promise, cb) {
  return promise.then(
    res => {
      let promise2 = cb()
      if (typeof promise2.then === 'function') {
        return promise2.then(() => {
          return res
        })
      }
      return res
    },
    reason => {
      let promise2 = cb()
      if (typeof promise2.then === 'function') {
        return promise2.then(() => {
          throw reason
        })
      }
      throw reason
    }
  )
}

Promise.all({
  foo: doSomething(),
  bar: doSomethingElse(),
  quux: doAnotherThing().then(q => q.property),
}).then(values => {
  const { foo, bar, quux } = values
  // now you have the result of foo, bar, and quux (including the transformation on quux from the "then" that it had)
})

let promise = Promise.resolve()
let docs = [1, 2, 3]

docs.forEach(doc => {
  console.log('doc:', doc)
  promise = promise.then(() => {
    console.log('promise end', doc)
    return 'something'
  })
  console.log('promise out', doc)
})

var docs = [{}, {}, {}]
return Promise.all(
  docs.map(function(doc) {
    return db.post(doc)
  })
).then(function(results) {
  console.log(results)
})

let docs = [{}, {}, {}]
let promises = docs.map(doc => db.post(doc))
let results = []
for (let promise of promises) {
  results.push(await promise)
}
console.log(results)

let docs = [{}, {}, {}]
let promises = docs.map(doc => db.post(doc))
// WARNING: this doesn't work
let results = promises.map(async function(promise) {
  return await promise
})
// This will just be a list of promises :(
console.log(results)

let docs = [{}, {}, {}]
let promises = docs.map(doc => db.post(doc))
let results = await Promise.all(promises)
console.log(results)
