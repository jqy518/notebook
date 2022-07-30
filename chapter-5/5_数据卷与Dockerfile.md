#### 数据卷与DockerFile

```bash
#命令行方式挂载数据卷 -v
docker run -it -v 主机目录:容器内目录  -p 主机端口:容器内端口
```

#### MySql 数据及配置文件外挂示例

```shell
# -d 后台运行
# -p 端口映射
# -v 数据卷挂载
# -e 环境配置
# --name 容器名称 

docker run -d -p3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql101 mysql:5.7
```

##### 具名挂载和匿名挂载

```bash
#匿名挂载 
不指定主机路径直接：
-v 容器内路径
docker run -d -P --name nginx01 -v /etc/nginx nginx
#查看所有的volume的情况,如下显示的为匿名数据卷
docker volume ls
DRIVER    VOLUME NAME
local     99fe121ce20ad5a19ec8b5d6a7a09962347fae0ce1baca4b16118538d0182dde

#具名挂载
-v 卷名:容器内路径
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
#查看所有的volume的情况,如下显示的为具名数据卷
docker volume ls
local     juming-nginx
```

我们可以用`docker volume ls` 查看本地卷

还可以用如下命令查看卷的具体位置：

```bash
docker volume inspect juming-nginx
#显示如下：
[
    {
        "CreatedAt": "2022-07-20T20:47:47+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data", #这就是卷的具体位置了
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]

```

> 所有的docker容器内的卷，没有指定目录的情况下都 是在 `/var/lib/docker/volumes/xxxx/_data`
>
> 我们通过具名挂载可以方便的找到我们的一个卷，大多数情况都使用`具名挂载`

拓展：

```bash
#通过 -v 容器内路径：ro/rw 改变读写权限
ro readonly  #只读 只能通过宿主机来操作，容器内部是无法操作
rw readwrite #可读可写
docker run -d -P --name nginx01 -v juming-nginx:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:rw nginx
```



### dockerfile初识

```bash
#dockerfile01文件内容
FROM centos
VOLUME ["volume01","volume02"]
CMD echo "----end---"
CMD /bin/bash

```

再运行

```bash
docker build -f ./dockerfile01 -t jekion/centos:1.0 .
#如果遇到错误：error checking context: 'can't stat '/home/jekion/.cache/dconf''.
#原因是没有dockerfile所在目录没有访问权限，需要另建一个目录把dockerfile拷贝过去，再执行

docker images

REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
jekion/centos   1.0       0dc2668ca67f   10 minutes ago   231MB
#可以看到我们的镜像已经建立好了。

docker run -it 0dc2668ca67f /bin/bash

#启动进入容器 在volume01建一个文件1.txt 在容器外通过docker inspect 查看容器数据卷及数据卷容器外路径。
#我们可以发现数据卷采用的是匿名挂载
```

#### 容器之间共享数据卷

```bash
#可以使用： --volumes-from 来共享数据卷
#下面我们新建docker01,docker02
docker run -it --name docker01 0dc2668ca67f
#查看容器
docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS     NAMES
110187ec1ca9   0dc2668ca67f   "/bin/sh -c /bin/bash"   6 minutes ago   Up 6 minutes             docker01

#按CTRL+P+Q退出容器
docker run -it --name docker02 --volumes-from 110187ec1ca9 0dc2668ca67f
```

#### dockerfile介绍

1，dockerfile是用来 构建docker镜像的文件。

2 ，运行`docker build -f ./dockerfile01 -t jekion/centos:1.0 .` 构建生成一个镜像

3，再运行`docker run -d --name mycentos01 jekion/centos:1.0`生成容器

4，`docker push`发布镜像

#### dockerfile 指令介绍

```bash
FROM         #基础镜像，一切从这里开始构建
MAINTAINER   #镜像是谁写的，姓名+邮箱
RUN          #镜像构建的时候需要运行的命令
ADD          #添加内容，比如tomcat等
WORKDIR      #镜像的工作目录
VOLUME       #挂载的目录
EXPOST       #指定对外端口
CMD          #指定这个容器启动的时候需要运行的命令,只有最后一个会生效，可被替代
ENTRYPOINT   #指定这个容器启动的时候需要运行的命令，可以追加命令
ONBUILD      #当构建一个被继承DockerFile这个时候就会运行onbuild的指令，触发指令。
COPY         #类似ADD，将我们文件拷贝到镜像中
ENV          #构建的时候设置环境变量

```

#### 构建自己的centos dockerfile

```bash
FORM centos
MAINTAINER jekiion<jqy441036596@163.com>
ENV MYPATH /usr/local
WORKDIR $MYPATH
RUN yum -y install vim
RUN yum -y install net-tools
EXSPOSE 80
CMD echo $MYPATH
CMD echo "-----end------"
CMD /bin/bash
```

我们可以通`docker history 镜像id`查看构建历史步骤。

##### CMD 和ENTRYPORT 区别

编写一个`dockerfile-cmd-test`

```bash
FROM centos
CMD ["ls","-a"]
```

```bash
#生成镜像
docker build -f dockerfile-cmd-test -t cmdtest .
#运行生成容器
docker run 7579c0e81041
#结果显示为 ls -a 的结果
#如果我们想向后面追加一个 'l',
docker run 7579c0e81041 -l
#结果会报错，不能追加，面是用'-l'覆盖掉了，ls -a

如果采用ENTRYPOINT则可以。
```

