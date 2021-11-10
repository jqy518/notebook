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