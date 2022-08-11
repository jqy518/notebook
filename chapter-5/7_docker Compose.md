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

