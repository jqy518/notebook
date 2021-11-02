## 服务（service）管理

 - 服务（service）本质就是进程，但是是运行在后台的，通常都会监听某个端口，等待其它程序的请求，比如（mysqld,sshd 防火墙等），因此我们又称为守护进程，是Linux中非常重要的知识点。

 - 【service】管理指令
   - 【service 服务名 start|stop|restart|reload|status】
   - 注意：在CentOS7.0后，很多服务不再使用`service`，而是`systemctl`,如果要查看还有哪些服务可以使用`service` 进行管理，可以在`/etc/init.d`里查看。
        ```bash
        ls -l /etc/init.d
        ```  
- 【setup】 centos 7 可以通此命令查看所有进程。

- 服务的运行级别（runlevel）

   - `运行级别0`: 系统停机状态，系统默认运行级别不能设为0，否则不能正常启动。
   - `运行级别1`: 单用户工作状态，root权限，用于系统维护，禁止远程登陆。
   - `运行级别2`: 多用户状态（没有NFS），不支持网络。
   - `运行级别3`: 完全的多用户状态（没有NFS），登陆后进入控制台命令行模式。
   - `运行级别4`: 系统未使用，保留。
   - `运行级别5`: X11控制 台，登陆后进入图形GUI模式。
   - `运行级别6`: 系统正常关闭并重启，软件主体 运行级别不能设置6，否则不能正常启动。

   > Linux系统有以上7种运行级别：`常用的是级别3和5`


    ![图片](../imgs/liunx/10.jpg)

- 运行级别设置：
  - `/etc/initab` 中进行设置。

  -【systemctl get-default】获取当前运行级别

- 【chkconfig】指令，用于给服务在各个系统运行级别中设置`自启动/关闭`
  - 【chkconfig --list[ | grep xxxx]】 查看服务。
  - 【chkconfig 服务名 --list】
  - 【chkconfig --level 5 服务名 on/off】

- 【systemctl】 管理指令
   - 基本语法：`systemctl [start|stop|restart|status] 服务名`
   - systemctl 指令管理的服务在`/usr/lib/systemd/system` 查看。
   - systemctl 设置服务的自启动状态
     - 【systemctl list-unit-files [| grep 服务名]】 查看服务开机启动状态。
     - 【systemctl enable 服务名】 设置开机启动 
     - 【systemctl disable 服务名】 关闭服务开机启动 
     - 【systemctl is-enabled 服务名】 查询某个服务是否是自启动的

- 应用案例
  - 查看当前防火墙状况，关闭防火墙和重启防火墙
    ```bash
    systemctl status firewalld.service
    systemctl stop firewalld.service
    systemctl start firewalld.service
    ```
