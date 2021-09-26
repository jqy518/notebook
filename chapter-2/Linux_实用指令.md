# 实用指令
## 指定运行级别

 - `0`:关机
 - `1`:单用户【找回丢失密码】
 - `2`:多用户状态没有网络服务
 - `3`:多用户状态有网络服务
 - `4`:系统未使用保留给用户
 - `5`:图形界面
 - `6`:系统重启

 常用运行级别是`3`和`5`,也可以指定默认运行级别。

 ## 级别相关指令

- 【init 0|1|2|3|4|5|6】` 来进行不同级别切换

 在centos7以前，是在`/etc/inittab`里进行默认级别设置。

 在centos7以后，进行了简化可以用以下指令来获取和设置默认级别。

- 【systemctl get-default】 获取当前系统运行级别
- 【systemctl set-default `TARGET.target`】进行设置，其中TARGET.target表示级别，常用取值如下:

> multi-user.target : 代表3这个级别

> graphical.target : 代表5这个级别

示例：【systemctl set-defalut multi-user.target】设置默认级别3，运行后，再重启则进行3级别运行。