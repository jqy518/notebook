

### Swarm 集群搭建

#### swarm 介绍及工作模式

Swarm 在 Docker 1.12 版本之前属于一个独立的项目，在 Docker 1.12 版本发布之后，该项目合并到了 Docker 中，成为 Docker 的一个子命令。目前，Swarm 是 Docker 社区提供的唯一一个原生支持 Docker 集群管理的工具。它可以把多个 Docker 主机组成的系统转换为单一的虚拟 Docker 主机，使得容器可以组成跨主机的子网网络。

两种类型的节点：`manager` 和`workers`

![image-20220818194131301](D:\code\2020\notebook\imgs\docker\image-20220818194131301.png)

管理节点`manager`可以互相通信，管理节点可以控制`worker`节点。

工作节点`worker`不能控制管理节点。

`Raft` 一致性算法。

#### docker集群相关命令：

```bash
docker swarm：#集群管理，子命令有 init, join,join-token, leave, update
docker node：#节点管理，子命令有 demote, inspect,ls, promote, rm, ps, update
docker service：#服务管理，子命令有 create, inspect, ps, ls ,rm , scale, update
docker stack/deploy：#试验特性，用于多应用部署，等正式版加进来再说。
```

#### 安装docker-machine及创建swarm练习需要的虚拟主机

`docker-machine`工具，可以方便我们演示主机网络。这个工具与 Docker Compose、Docker Swarm 并称 Docker 三剑客。

- **config**：查看当前激活状态 Docker 主机的连接信息。
- **create**：创建 Docker 主机
- **env**：显示连接到某个主机需要的环境变量
- **inspect**： 以 json 格式输出指定Docker的详细信息
- **ip**： 获取指定 Docker 主机的地址
- **kill**： 直接杀死指定的 Docker 主机
- **ls**： 列出所有的管理主机
- **provision**： 重新配置指定主机
- **regenerate-certs**： 为某个主机重新生成 TLS 信息
- **restart**： 重启指定的主机
- **rm**： 删除某台 Docker 主机，对应的虚拟机也会被删除
- **ssh**： 通过 SSH 连接到主机上，执行命令
- **scp**： 在 Docker 主机之间以及 Docker 主机和本地主机之间通过 scp 远程复制数据
- **mount**： 使用 SSHFS 从计算机装载或卸载目录
- **start**： 启动一个指定的 Docker 主机，如果对象是个虚拟机，该虚拟机将被启动
- **status**： 获取指定 Docker 主机的状态(包括：Running、Paused、Saved、Stopped、Stopping、Starting、Error)等
- **stop**： 停止一个指定的 Docker 主机
- **upgrade**： 将一个指定主机的 Docker 版本更新为最新
- **url**： 获取指定 Docker 主机的监听 URL
- **version**： 显示 Docker Machine 的版本或者主机 Docker 版本
- **help**： 显示帮助信息

```bash
#安装
curl -L https://ghproxy.com/https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-`uname -s`-`uname -m` >/usr/local/bin/docker-machine && \
  chmod +x /usr/local/bin/docker-machine
  
#创建主机
 docker-machine create -d virtualbox manager
#如果提示'VBoxManage not found'
sudo apt install virtualbox
#
```

