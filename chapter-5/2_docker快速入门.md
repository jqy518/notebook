# docker快速入门

## docker安装信息

``` bash
#查看版本
docker version
#查看docker信息
docker info
```
Docker 是服务器----客户端架构。命令行运行`docker`命令的时候，需要本机有 Docker 服务。如果这项服务没有启动，可以用下面的命令启动:
``` bash
# service 命令的用法
$ sudo service docker start

# systemctl 命令的用法
$ sudo systemctl start docker
```
#####  常用帮助命令

```shell
docker version
docker info   #显示docker的系统信息
#docker cli命令在线官方文档
https://docs.docker.com/engine/reference/run/
```



#####  镜像命令

```shell
docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    feb5d9fea6a5   5 months ago   13.3kB
#说明
REPOSITORY   镜像仓库名称
TAG          镜像标签
IMAGE ID     镜像的ID
CREATED      创建时间
#可选项
-a, --all             显示所有镜像
-q, --quiet           只显示ID


```

##### 搜索拉取镜像

```bash
#在dockerhub上搜索stars>300的mysql镜像
docker search mysql -f STARS=300
#拉取镜像
docker pull mysql
#也可以指定版本拉取下载
#具体想知道哪些版本是支持的可到dockerhub上搜索镜像里面有support tags一栏
docker pull mysql:5.7
```

##### 删除镜像

```bash
#docker rmi [镜像id]
docker rmi c20987f18b13
#删除所有镜像，可以用以下方法,把docker images -aq的结果作为docker rmi 的参数
docker rmi -f $(docker images -aq)
```

##### 新建容器并启动

```bash
# centos为例
docker pull centos

#docker run
#命令格式 docker run [可选参数] images
--name="myName" 容器名称，用来区分容器
-d              后台方式运行
-it             使用交互方式运行，进入容器内容
-p              指定容器的端口 -p 8080:8080
   -p 主机端口：容器端口 （常用）
   -p 容器端口
   -p ip:主机端口：容器端口
   容器端口
-P              随机指定端口   

#示例，启动并进入容器
docker run -it centos /bin/bash
#启动并进入容器结束后立刻删除容器
docker run -it --rm centos /bin bash

#进入之后想退出

exit   #直接容器停止并退出

ctrl+P+Q  #容器不停止退出 可能需要等几秒



```



##### 列表所有的运行的容器

```bash
# docker ps 命令
docker ps
            #不带参数列表当前正在运行的容器
-a          #列表所有运行的和运行过的容器
-n=?        #显示最近创建的几条容器
-q          #只显示容器的编号
```

##### 删除容器

```bash
docker rm 容器id                 #删除指定容器，不能删除正在运行的容器，如果要强制删除运行中的 可以加 -f
docker rm -f $(docker ps -aq)   #删除所有容器
docker ps -a -q | xargs docker rm  #删除所有容器

```



#####  容器命令

```bash
#查看所有容器信息
$ docker ps -aq

$ docker start 89aab435199b  #启动容器
$ docker restart 89aab435199b  #启动容器
$ docker stop 89aab435199b   #停止容器
$ docker kill 89aab435199b  #强制停当前容器
# 在容器内进行命令 (如下是执行ls)
$ docker exec -it 1eed68b405b0 ls
# 进入容器
$ docker exec -it 1eed68b405b0 /bin/bash
#进入一个正在运行的容器
$ docker attach  89aab435199b (容器ID)
```

##### 从容器内拷备文件

```bash
#拷备容器（31d39b8334fa）/home/java.txt 至 主机 /home目录
$ sudo docker cp 31d39b8334fa:/home/java.txt /home
```





## 其他常用命令或常见问题

##### 后台启动容器问题

```bash
#想：后台进行cenos，运行如下命令
docker run -d centos
#问题：docker ps 发现centos 停止了,原因：centos容器使用后台运行，就必须要有一个前台进程，docker发现没有应用，就会自动停止
#对于centos启动需要加-it
docker run -it -d centos
```

##### 日志

```shell
docker logs -ft --tail 10 容器ID
   -f         #跟踪日志输出，会监听日志输出
   -t         #带上时间戳
   --tail     #显示最后多少条日志
   
```

##### 查看容器相关信息

```bash
#查看容器中的进程信息
docker top 容器ID
#查看容器端口映射
docker port 容器ID
#查看容器日志
docker logs 容器ID	
```

##### 查看容器或镜像的详情元信息

```bash
docker inspect 容器ID/镜像ID
```

