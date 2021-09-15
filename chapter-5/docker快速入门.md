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
## image文件

```bash
#查看所有image信息
$ docker container ls --all

$ docker container start 89aab435199b
$ docker container stop 89aab435199b
$ docker container rm 89aab435199b
# 进入容器
$ docker container exec -it 1eed68b405b0 /bin/bash
```


