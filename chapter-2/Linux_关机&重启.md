##  关机和重启命令

 - 【shutdown -h now】 立刻进行关机，
 - 【shutdonw -h 1】  一分钟之后关机
 - 【shutdown -r now】 现在重新启动计算机
 - 【halt】 关机，作用和上面一样
 - 【reboot】 现在重新启动计算机
 - 【sync】 把内存数据同步到磁盘

> 注意：不管是重启系统还是关闭系统，首先要运行`sync`命令，把内存中的数据写到磁盘中。
> 目前的 `shutdown/reboot/halt`等命令均已经 在关机前进行了sync。

## 用户切换

- 【su -】 切换到root用户,切回来只需要【logout】