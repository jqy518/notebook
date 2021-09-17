# http模块

### 创建一个HTTP服务

> http.createServer([options][, requestListener])

`options`有两个选项：
+ `IncomingMessage` 指定要使用的 IncomingMessage 类，用于扩展原始的`http.IncomingMessage`类
+ `ServerResponse` 指定要使用的 ServerResponse类，用于扩展原始的
`http.ServerResponse`类

`requestListener` 是一个自动添加到 'request' 事件的函数。

+ 注意：函数的两个入参分别为 `request`,`response`;
request为options指定的`http.IncomingMessage`扩展类；如果没指定则为原始的`http.IncomingMessage`类；response同理；

创建http服务器：
```javascript
let httpServer = http.createServer(function(req,res){
  //req 为http.IncomingMessage实例
  // res 为http.ServerResponse实例
})
```
对`http.IncomingMessage`进行自定义扩展:
```javascript
let http = require('http')
class MyIncomingMessage extends http.IncomingMessage {
	constructor () {
		super()
		this.name = 'testIncomingMessage'
	}
	getName () {
		return this.name
	}
}
let hserver = http.createServer({
	IncomingMessage: MyIncomingMessage
}, function (req, res) {
	let url = req.url
	let name = req.getName()
	res.end(`url:${url},name:${name}`)
})
hserver.listen(3000)
```
## http.Server类
`http.Server`继承自`net.Server`类；`http.createServer()`方法返回一为`http.Server`类的实例;

有如下等事件：

+ `close`:当服务器关闭时触发
+ `connect`, 每次客户端请求 HTTP CONNECT 方法时触发。
+ `connection`, 建立新的 TCP 流时会触发此事件。
+ `request`,每次有请求时都会触发。
+ `upgrade` 每次客户端请求 HTTP 升级时发出。

常用方法和属性:
```javascript
server.close() //停止服务器接受新连接。
server.listen() //启动 HTTP 服务器监听连接。
server.listening //表明服务器是否正在监听连接，boolean类型
server.setTimeout(ms,[callback]) //设置套接字的超时值
server.timeout //套接字超时的不活动毫秒数,设置更改些值仅影响到服务器的新连接，而不影响任何现有连接；设为0将禁用传入连接的超时行为。
```

## http.IncomingMessage类
有两个地方会实例化这个类：
+ 调用`http.createServer()`创建`http.Server`时，实例化此类，并把实例做为`request`事件监听器的每一个参数如上面示例。

+ 调用`http.request()`创建`http.ClientRequest`时，实例化些类，并把实例作为`reponse`事件监听器的第一个参数。

#### 获取请求头信息
> message.headers
```javascript
let httpServer = http.createServer(function(req,res){
   console.log(req.headers) //请求头信息
})
```
#### 获取请求方法，HTTP版本
> message.method ,message.http.Version

### 获取GET请求url上的参数
> message.url

```javascript
const url = require('url')
let httpServer = http.createServer(function(req,res){
   let qurl = url.parse(req.url, true) //解析生成一个URL对象，true参数使返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象。

   console.log(qurl.query) //参数
   console.log(query.pathname) //请求路径
   
})
```
### 获取POST请求参数
`IncomingMessage`实现了`可读流`接口;我们通过监听`data`事件来获取请求实体数据。
```javascript
const { URLSearchParams } = require('url');
let httpServer = http.createServer(function(req,res){
   readable.setEncoding('utf8'); //如果确定实体数据都是字符可先设定编码，接收到的chunk则为相应编码的字符串
   let dataArr = []
   req.on('data',function(chunk){
     dataArr.push(chunk)
   })
   req.on('end',function(){
     console.log(dataArr.join(''))
     //如果是POST表单数据，可以用URLSearchParams进行解析
     let params = new URLSearchParams(dataArr.join(''))

     console.log(params.get('name')) //获取参数值
   })
})
```

## http.ServerResponse类

调用`http.createServer()`创建`http.Server`时，实例化此类，并把实例做为`request`事件监听器的每二个参数如上面示例；`ServerResponse`也继承自`Stream`类

### 设置响应头信息

`response.setHeader()`,`response.writeHead()`都可以用来设计响应头信息；
但`response.writeHead()`里设置的头信息优化。

```javascript
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```









