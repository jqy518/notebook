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
