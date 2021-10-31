## 服务（service）管理

 - 服务（service）本质就是进程，但是是运行在后台的，通常都会监听某个端口，等待其它程序的请求，比如（mysqld,sshd 防火墙等），因此我们又称为守护进程，是Linux中非常重要的知识点。

 - 【service】管理指令
   - 【service 服务名 start|stop|restart|reload|status】
   - 注意：在CentOS7.0后，很多服务不再使用`service`，而是`systemctl`,如果要查看还有哪些服务可以使用`service` 进行管理，可以在`/etc/init.d`里查看。
        ```bash
        ls -l /etc/init.d
        ```  