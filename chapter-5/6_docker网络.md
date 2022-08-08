### docker网络

#### docker0

``` bash
# 查看ip 地址
ip addr

```

![](../imgs/docker/1.png)

我们只要安装了docker，就会有一个网卡docker0桥接模式，使用的技术是`evth-pair`技术。

```bash
#启动一个容器
docker run -d -P --name tomcatTest tomcat
#查看容器ip地址
docker inspect 容器id --format='{{.NetworkSettings.IPAddress}}'
```

我们可以发现，在宿主机上可以ping通容器ip

原理：

我们每启动一个docker 容器，docker 就会给容器分配置一个ip。并在宿主机上虚拟一张网卡，并与容器内桥接。（evth-pair技术）。

不尽宿主机与容器之前可以ping通，容器与容器之间也可以ping通，如下

```bash
#查看容器1的ip
$ docker inspect fa70c216cc35 --format='{{.NetworkSettings.IPAddress}}'
172.17.0.3
#查看容器2的ip
$ docker inspect e2ec3735866f --format="{{.NetworkSettings.IPAddress}}"
172.17.0.3
#在容器2内ping容器1
$ docker exec -it e2ec3735866f ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.283 ms
64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.126 ms
64 bytes from 172.17.0.3: icmp_seq=3 ttl=64 time=0.119 ms

```

原理：

我们可以把网卡`docker0`想像成局域网中的路由，启动一个容器，好比在这个“路由器”中插入一根网线连接一个设备；`docker01`维护着容器的路由表。

![](D:\code\2020\notebook\imgs\docker\2.png)

Docker中的所有的网络接口都是虚拟的，虚拟的转发效率高。

只要容器删除，对应网桥一对就会被删除。

#### 容器之间可以通过名称来ping通：--link

```bash
#启动容器时带上--link
docker run -d -P --name tomcat02 --link tomcat03 mytomcat:v1.1
#在容器tomcat02中ping tomcat03 可以ping通
docker exec -it tomcat02 ping tomcat03
```

### docker network

我们可以通过`docker network`查看docker的网络情况

```bash
docker network ls
#结果
NETWORK ID     NAME      DRIVER    SCOPE
4797b6bf117d   bridge    bridge    local
67c91e8c3906   host      host      local
a2a9851d5629   none      null      local
#其中 bridge 就是docker0网卡

#查看docker01网络情况
docker network inspect 4797b6bf117d
#可以查看docker01,及所有连接容器的ip信息
```

--link 原理

实际是修改了容器内部的hosts文件。我们可以输出hosts看一下：

```bash
docker exec -it 01386847d44a cat /etc/hosts
#结果
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.17.0.2	e2ec3735866f e2ec3735866f jekiontomcat 
172.17.0.3	01386847d44a

```

> --link 不建议使用，因为只有配置了--link的容器可以用名称ping link目标容器，目标容器不能反向通过名称ping源容器。

### 自定义网络

我们可以通过`docker network create`创建一个新的网络

```bash
#创建一个名为mynet的网络，子网掩码为192.168.0.0/16 网关为192.168.0.1
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
#查看创建的网络ID
docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
dc55e7bf18e1   bridge    bridge    local
67c91e8c3906   host      host      local
ac2cd7e0814a   mynet     bridge    local

#查看新建网络mynet的详情
docker network inspect ac2cd7e0814a

```

接下来，运行创建容器时可以指定我们刚创建的网络

```bash
#创建容器01
docker run -d -P --name mynettomcat-01 --net mynet mytomcat:v1.1
#创建容器02
docker run -d -P --name mynettomcat-02 --net mynet mytomcat:v1.1
#我们发现自定义网络可以直接互相通过名称ping
docker exec -it mynettomcat-01 ping mynettomcat-02
PING mynettomcat-02 (192.168.0.3) 56(84) bytes of data.
64 bytes from mynettomcat-02.mynet (192.168.0.3): icmp_seq=1 ttl=64 time=0.196 ms
64 bytes from mynettomcat-02.mynet (192.168.0.3): icmp_seq=2 ttl=64 time=0.132 ms
64 bytes from mynettomcat-02.mynet (192.168.0.3): icmp_seq=3 ttl=64 time=0.131 ms

```

### 网络之间联通

两个网络之间，比如`docker0`与`mynet`之间如果需要通信，应该如何做?我们可能通过 `docker network connect`，把一个网络中的容器加到另一个网络。

```bash
#docker network connect [网络] [容器]
docker network connect mynet e2ec3735866f
```

### Redis集群部署

```bash
#创建网络
docker network create --driver bridge --subnet 172.38.0.0/16 --gateway 172.38.0.1 redis

#通过脚本创建六个redis配置及六个redis docker容器
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF

docker run -p 637${port}:6379 -p 1637${port}:16379 --name redis-${port} \
-v /mydata/redis/node-${port}/data:/data \
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.1${port} redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf;

done

#创建集群,随便在哪个容器内创建都可以
docker exec -it c958b13dff88 redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1

#测试，进入容器运行
redis-cli -c
#查看集群信息
cluster nodes
#结果
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:2
cluster_stats_messages_ping_sent:854
cluster_stats_messages_pong_sent:876
cluster_stats_messages_meet_sent:4
cluster_stats_messages_sent:1734
cluster_stats_messages_ping_received:875
cluster_stats_messages_pong_received:858
cluster_stats_messages_meet_received:1
cluster_stats_messages_received:1734

#查看集群节点
cluster nodes
#结果
7c85ee112929bbbb83e573cdb623ab5a12cc283a 172.38.0.14:6379@16379 slave 0b9e27f65efd8b11775ba982b3c074da5562fc9a 0 1659999516589 4 connected
a6e37fd920e061daf4140a0e87b2c808c294761f 172.38.0.16:6379@16379 slave 94b11931d72498584380e99386e9e36041ad4949 0 1659999515987 6 connected
0b9e27f65efd8b11775ba982b3c074da5562fc9a 172.38.0.13:6379@16379 master - 0 1659999516000 3 connected 10923-16383
a2e5ba10ff17a722eb80a358d3fdc2473925985b 172.38.0.11:6379@16379 master - 0 1659999516000 1 connected 0-5460
94b11931d72498584380e99386e9e36041ad4949 172.38.0.12:6379@16379 myself,master - 0 1659999515000 2 connected 5461-10922
2a288c609945cfdc2a73f8b8b3cc9bbb1dc3b0dc 172.38.0.15:6379@16379 slave a2e5ba10ff17a722eb80a358d3fdc2473925985b 0 1659999516990 5 connected



```

