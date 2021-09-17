## global 全局变量

类似浏览器用的`window`对象，`node`中有一个`global`对象；下面列表部分实用的全局变量：

#### process：主进程对象
process主进程对象下面有很多实用有趣的方法及属性；下面会做更多介绍。

#### __dirname | __filename
`__dirname` :当前模块的目录名；<br/>
`__filename`:当端模块的文件名；

这两变量虽然看似全局的，但实际上不是；属性模块范围内的。

#### exprots | module | require()方法
这三个变量及方法也是一样虽然看似全局的，但实际上不是；属性模块范围内的。

`exprots`是`module.exports`的引用；

#### setImmediate() | setInteval() | setTimeout()

定时器方法
`setImmediate`会开启一个宏任务，会加入到下一次事件循环中。`process.nextTick`会开启一个微任务；回调会在当前宏任务中执行。
考虑下面代码执行顺序：
```javascript
console.log('task_start')

setTimeout(() => {
	console.log('setTime1')
}, 0)

setImmediate(() => {
	console.log('setImmediate')
})

process.nextTick(() => {
	console.log('nextTick')
})
new Promise((resolve, reject) => {
	resolve()
}).then((data) => {
	console.log('promise')
})

console.log('task_end')
```

## process 主进程

#### argv 变量

`process.argv` 返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。 第一个元素是 process.execPath；第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。

#### cwd()方法

`process.cwd()`方法返回 Node.js 进程的当前工作目录。

#### chdir()方法
process.chdir()方法变更Node.js进程的当前工作目录；
#### chdir()方法

`process.env`属性返回包含用户环境的对象。

#### stdin | stdout

`process.stdin` 和`process.stdout` 都是`双工流`(是同时实现了 Readable 和 Writable 接口的流。)

#### exit()

`process.exit(code)`可以强制进程尽快退出。参数为退出代码,为一个整形值。如果不传，则为`0`或者`process.exitCode`
