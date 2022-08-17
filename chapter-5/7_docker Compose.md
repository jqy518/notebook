### Docker componse 安装

```bash
#下载
sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.28.5/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
#修改权限
sudo chmod +x /usr/local/bin/docker-compose
#查看版本
docker-compose --version
```

### 快速入门

可以参考官网DEMO：https://docs.docker.com/compose/gettingstarted/



### docker-compose.yml 规则

官方参考文档：https://docs.docker.com/compose/compose-file/compose-file-v3/

```yaml
#3层
version:'' #对应的compse版本
services: #服务
	服务1:web
		images
		build
		network
		depends_on: #web服务的依赖
		  -redis 
		....
	服务2:redis
	    ....
#其他配置，网络、卷，全局规则
volumes:
networks:
configs:

```

### 使用Compose一键部署wp博客

```bash
services:
  db:
    # We use a mariadb image which supports both amd64 & arm64 architecture
    image: mariadb:10.6.4-focal
    # If you really want to use MySQL, uncomment the following line
    #image: mysql:8.0.27
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    ports:
      - 80:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
volumes:
  db_data:
```

