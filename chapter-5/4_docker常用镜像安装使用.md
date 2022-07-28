#### docker 常用镜像安装



##### nginx

```bash
#查询镜像
docker search nginx
#拉取镜像
docker pull nginx
#运行容器:后台运行启动一个名为mynginx的
docker run --name mynginx -d -p 8080:80 nginx
#进入容器bash(nginx也是运行在一个linux系统里)
docker exec -it mynginx /bin/bash
#进入后查看nginx目录
whereis nginx

nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx

```

##### tomcat

```bash
docker pull tomcat:9.0
#后台运行容器
docker run -d -p 8888:8080 --name mytomcat tomcat:9.0
#进入容器bash
docker exec -it mytomcat /bin/bash

```

##### mysql

```bash
#初始化容器
docker run -itd --name mysql01 -p:3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
#进入容器
docker exec -it mysql01 /bin/bash
#进入后就可以通过mysql-client对mysql进行操作
mysql -uroot -p123456

```

