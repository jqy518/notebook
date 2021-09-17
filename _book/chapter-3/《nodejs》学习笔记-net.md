# net模块

`net` 模块用于创建基于流的TCP或IPC的服务器与客户端

### 创建一个TCP服务器:
> net.createServer([options][, connectionListener])
```javascript
let server = net.createSever((socket) =>{
    //socket为net.Socket实例。
})
server.listen(8124,()=>{
  console.log('server bound')
})
```

`connectionListener`方法为`connection`事件自动设置一个监听器。 
`server.listen`的入参方法会为`listening`事件自动设置一个监听器。

### 创建一个客户连接(TCP)
> net.createConnection(options[, connectListener])

`connectListener`方法为socket实例`connection`事件自动设置一个监听器。

```javascript
let socket = net.createConnection(3000,'127.0.0.1',()=>{
  console.log('connected to server')
})
```

检查某个IP的类型：
`net.isIP`,`net.isIPv4`,`net.isIPv6`
```javascript
net.isIP('2001:0:dcfa:4014:cc0:1891:f5f5:eb74') //ipv6地址返回6
net.isIP('127.0.0.1') //ipv4地址 返回4
```

## net.Socket类

`net.Socket`实例是一个双工流，并且也是一个`EventEmitter`

