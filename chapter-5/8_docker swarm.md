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

```
curl -L https://ghproxy.com/https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-`uname -s`-`uname -m` >/usr/local/bin/docker-machine && \
  chmod +x /usr/local/bin/docker-machine
```

