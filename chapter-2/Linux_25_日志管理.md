## 日志管理

- 系统常用日志
  ![图片](../imgs/liunx/12.jpg)

- 日志管理程序
  - 【rsyslogd】centOS7.6日志服务
  - 【syslogd】centOS6.x日志服务
    - `rsyslogd`功能更强大，并用兼容`syslogd`服务
  - 查询`rsyslogd`服务是否启动：`【ps aux | grep "rsyslog" | grep -v "grep"】  `
  - `rsyslogd`的配置文件`/etc/rsyslog.conf`
    - 这个文件配置了rsyslogd写日志的规则，如上图系统常用日志生成的日志文件。
  - 查询`rsyslogd`服务的自启动状态`【systemctl list-unit-files | grep rsyslog】`

- 配置文件`/etc/rsyslog.conf` 解读：
  - 编辑文件时的格式为：`*.*`,存放日志文件
  - 其中第一个`*`代表日志类型，第二个`*`代表日志级别
  - 日志类型分为:
    - `auth` ---- pam产生的日志
    - `authpriv` ---- ssh,ftp等登录信息的验证信息
    - `corn` ---- 时间任务相关
    - `kern` ---- 内核
    - `lpr` ---- 打印
    - `mail` ---- 邮件
    - `mark(syslog)-rsyslog` ---- 服务内部的信息，时间标识
    - `news` ---- 新闻组
    - `user` ---- 用户程序产生的相关信息
    - `uucp` ---- unix to nuix copy主机之间相关的通信
    - `local 1-7` ---- 自定义的日志设备

  - 日志级别：
    - `debug` --- 有调试信息的，日志通信最多
    - `info` --- 一般信息日志，最常用
    - `notice` --- 最具有重要性的普通条件的信息
    - `warning` --- 警告级别
    - `err` --- 错误级别，阻止某个功能或者模块不能正常工作的信息
    - `crit` --- 严重级别，阻止整个系统或者整个软件不能正常工作的信息
    - `alert` --- 需要立刻修改的信息
    - `emerg` --- 内核崩溃等重要信息
    - `none` --- 什么都不记录

     > 注意：从上到下，级别从低到高，记录信息越来越少。
-