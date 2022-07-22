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

