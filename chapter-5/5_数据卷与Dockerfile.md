#### 数据卷与DockerFile

```bash
#命令行方式挂载数据卷 -v
docker run -it -v 主机目录:容器内目录  -p 主机端口:容器内端口
```

#### MySql 数据及配置文件外挂示例

```shell
docker run -d -p3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql101 mysql:5.7
```



