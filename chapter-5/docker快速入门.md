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



#####  容器命令

```bash
#查看所有image信息
$ docker container ls --all

$ docker container start 89aab435199b
$ docker container stop 89aab435199b
$ docker container rm 89aab435199b
# 进入容器
$ docker container exec -it 1eed68b405b0 /bin/bash
```


