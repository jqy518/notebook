## jdk安装
 
 - 到官网下载相应版本：https://www.oracle.com/java/technologies/downloads/
    ```bash
    wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz

    ```
 - 创建java目录：`mkdir /usr/local/java`
 - 解压：`tar -zxvf jdk-17_linux-x64_bin.tar.gz`
 - 配置环境变量`vim /etc/profile`
   ```bash
    export JAVA_HOME=/usr/local/java/jdk-17
    export PATH=$JAVA_HOME/bin:$PATH
   ```
 - 让配置文件生效：`source /etc/profile`
  
  > ps:如果profile文件不小心改坏了（环境变量$PATH未导出），一些常用命令都用不了了，怎么办? 我们可以进行到环境变量相应目录进行操作：`/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin`;如我本地`vim`在`/usr/bin`下面，我们就可以用vim把/etc/profile文件修正，再重启一下就行。

## tomcat的安装
 - 官网下载：`https://tomcat.apache.org/download-80.cgi`
   ```bash
    wget https://dlcdn.apache.org/tomcat/tomcat-8/v8.5.72/bin/apache-tomcat-8.5.72.tar.gz
   ```

 - 创建目录：`mkdir /opt/tomcat`
 - 解压：`tar -zxvf apache-tomcat-8.5.72.tar.gz -C /opt/tomcat`
 - 进行`bin`目录下的`startup.sh`,关闭用`shutdown.sh`
 - 把`8080`端口加入到防火墙白名单：
    ```bash
     firewall-cmd --permanent --add-port=8080/tcp
     firewall-cmd --query-port=8080/tcp #查看是否正常
     firewall-cmd --reload #重载
    ```

## mysql安装

- 官网下载：
   ```bash
    wget https://dev.mysql.com/get/mysql-5.7.26-1.el7.x86_64.rpm-bundle.tar
   ```
- 创建：`mkdir /usr/local/mysql`
- 解压: `tar -xvf mysql-5.7.26-1.el7.x86_64.rpm-bundle.tar -C /usr/local/mysql`
- 删除自带的`mariadb`，这个系统自的数据库会与`mysql`冲突。
  ```bash
   rpm -qa | grep mari #查询相关包
   #如果有删除
   rpm -e --nodeps mariadb-libs
  ```
- 安装`mysql`

  ```bash
  #按以下顺序依次安装
   rpm -ivh mysql-community-common-5.7.26-1.el7.x86_64.rpm
   rpm -ivh mysql-community-libs-5.7.26-1.el7.x86_64.rpm
   rpm -ivh mysql-community-client-5.7.26-1.el7.x86_64.rpm
   rpm -ivh mysql-community-server-5.7.26-1.el7.x86_64.rpm
  ```
  > ps :安装过程中如果报：`libncurses.so.5()(64bit) 被 mysql-community-client-5.7.26-1.el7.x86_64 需要`错误，一般是libncurses.so.5依赖找不到。只需要安装一下就行：
  `dnf install ncurses-compat-libs`

- 运行 `systemctl start mysqld.service` 启动mysql
- 然后开始设置root用户密码
   - mysql自动给root用户设置随机密码，运行grep "password" /var/log/mysqld.log 可看到当前密码。

 ```bash
  mysql -u root -p # 进入mysql
  mysql> set global validate_password_policy=0 #提示密码设置策略，0：比较简单只需长度大于8，1：要求长度，数字，大小写 特殊字条（生产环境），2：要求长度，数字 大小写 特殊字符 字典文件。
  mysql> set password for 'root'@'localhost'=password('12345678') #设置密码 
  mysql> flush privileges #刷新使其生效
 ```