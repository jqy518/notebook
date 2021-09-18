## 实现一个 Promise

要实现一个`Promise`我们需要先弄清楚一个 Promise 需要满足什么要求及规范。我们可以参考[Promises/A+](https://promisesaplus.com/)

<b>大概可以梳理出以下只个规范：</b>

- promise 有三个状态：`pending`，`fulfilled`，`rejected`；「规范 Promise/A+ 2.1」
- new promise 时， 需要传递一个`executor()`执行器，`执行器立即执行`；
- `executor`接受两个参数，分别是`resolve`和`reject`；
- promise 的默认状态是 `pending`；
- promise 有一个`value`保存成功状态的值，可以是`undefined/thenable/promise`；「规范 Promise/A+ 1.3」
- promise 有一个`reason`保存失败状态的值；「规范 Promise/A+ 1.5」
- promise 只能`从pending到rejected`, 或者`从pending到fulfilled`，状态一旦确认，就不会再改变；
- promise 必须有一个 then 方法，then 接收两个参数，分别是 promise 成功的回调 `onFulfilled`, 和 promise 失败的回调 `onRejected`；「规范 Promise/A+ 2.2」
- 如果调用 then 时，promise 已经成功，则执行`onFulfilled`，参数是 promise 的`value`；
- 如果调用 then 时，promise 已经失败，那么执行`onRejected`, 参数是 promise 的`reason`；
- 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调`onRejected`；

### 一个简单的 Promise 实现

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 存放成功的回调
    this.onResolvedCallbacks = []
    // 存放失败的回调
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
```

但我们发现，上面的实现并不能链式调用,如下面代码：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(1)
})

p1.then((res) => {
  console.log(res)
  //then回调中可以return一个Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
})
  .then((res) => {
    console.log(res)
    //then回调中也可以return一个值
    return 3
  })
  .then((res) => {
    console.log(res)
  })
```

要实现链式调用需要考虑的几点：

- 要实现链式，显然`.then()`需要返回一个 Promise，这样才能找到 then 方法，所以我们会把 then 方法的返回值包装成 Promise。
- `.then()`的回调需要拿到上一个`.then()`的返回值
- `.then()`的回调需要顺序执行，以上面这段代码为例，虽然中间 return 了一个 Promise，但执行顺序仍要保证是 1->2->3。我们要等待当前 Promise 状态变更后，再执行下一个 then 收集的回调，这就要求我们对 then 的返回值分类讨论

### 完整实现

```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  //构建方法接收一个回调
  constructor(executor) {
    this._status = PENDING //Promise初始状态
    this._value = undefined //存储值
    this._resolveQueue = [] //成功回调队列。 resolve 时触发
    this._rejectQueue = [] //失败队列。reject时触发

    //这里使用箭头函数，固定this，因为内部需要使用到:this._resolveQueue
    let _resolve = (val) => {
      const run = () => {
        if (this._status !== PENDING) {
          //规范：状态只能由pending ---> fulfilled
          return
        }
        this._status = FULFILLED
        this._value = val
        // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift()
          callback(val)
        }
      }
      //之所以放到setTimeout里执行，是保证当executor里是同步代码时，Promise的顺序也是：new Promise -> then()收集回调 -> resolve/reject执行回调，否则顺序会变成：
      //Promise -> resolve/reject执行回调 -> then()收集回调
      //但这里有点不规范的地方是，Promise应该是一个微任务，如果放入setTimeout里就变成宏任务了（我们也可以用MutationObserver模拟微任务）
      setTimeout(run)
    }
    //reject回调实现
    let _reject = (val) => {
      const run = () => {
        if (this._status !== PENDING) {
          //规范：状态只能由pending ---> rejected
          return
        }
        this._status = REJECTED
        this._value = val
        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }

    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }

  //then方法实现 接收一个成功的回调和一个失败的回调
  then(resolveFun, rejectFun) {
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    typeof resolveFun !== 'function' ? (resolveFun = (value) => value) : null
    typeof rejectFun !== 'function'
      ? (rejectFun = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason)
        })
      : null
    //返回一个新的Promise，实现链式调用
    return new MyPromise((resolve, reject) => {
      //重新包装 resolveFun，因为我们要根据resolveFun的返回值（可能是一个Promise）来分类处理。
      const resoveWrapperFun = (value) => {
        try {
          //执行then传入的resolveFun回调，如果拿到其返回的值
          let x = resolveFun(value)
          //分类讨论返回值,如果是Promise,那么等待Promise状态变更拿到其值再resove出去,否则直接resolve
          //这里如果需要兼任第三方的Promise实现，那不需要这么严格，只需要看有没有then就行。而不是非得是MyPromise的实例
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (err) {
          reject(err)
        }
      }

      //同理，重新包装rejectFun
      const rejectWrapperFun = (error) => {
        try {
          let x = rejectFun(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (err) {
          reject(err)
        }
      }

      //根据此时的状态进行不同处理
      switch (this._status) {
        // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
        case PENDING:
          this._resolveQueue.push(resoveWrapperFun)
          this._rejectQueue.push(rejectWrapperFun)
          break
        // 当状态已经变为resolve/reject时,直接执行then回调
        case FULFILLED:
          resoveWrapperFun(this._value) // this._value是上一个then回调return的值
          break
        case REJECTED:
          rejectWrapperFun(this._value)
          break
      }
    })
  }
  //catch 方法其实就是执行一下then的第二个加调。
  catch(rejectFun) {
    return this.then(undefined, rejectFun)
  }
  //finally方法
  finally(callback) {
    /**
     * finally实现这里有一个细节需要考虑：就是当 callback 返回 一个reject状态的Promise 或 throw 一个Error 会改变当前Promise的状态，考虑下面代码
     * var p = Promise.resolve('ok')
      .finally(() => { 
        return Promise.reject('这里只有返回被拒绝的 promise 或者 throw 一个错误，才会影响当前 finally 返回的新 promise 的决议') })
      .then(value => {
        console.log('成功', value)
      }, (err) => {
        console.log('失败', err)
      });
     */
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value), // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason
        }) // reject同理
    )
  }
  //静态的resolve方法
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve) => resolve(value))
  }
  //静态reject方法，返回一个带拒绝原因的Promise对象
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }
}
```
