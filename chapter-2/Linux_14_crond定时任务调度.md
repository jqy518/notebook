## `crond`任务调度

  - 【crontab】进行定时任务的设置
    - 任务调度是指系统在某个时间执行的特定的命令或程序。分类：
       - 系统工作：有些重要的工作必须周而复始地执行。如病毒扫描等。
       - 个别用户工作：个别用户可能希望执行某些程序，比如对mysql数据库备份。
    - 【-e】 编辑crontab定时任务。
    - 【-l】 查询crontab任务。
    - 【-r】 删除当前用户所有的crontab任务。
    - 【service crond restart】 重启任务调试
  - 快速入门
    - 执行 【crontab -e】 命令。
    - 输入 【*/1 * * * * ls -l /etc/ > /tmp/to.txt】 意思说每小时的每分钟执行`ls -l /etc/ > /tmp/to.txt`命令。
    - 5个占位符*(`中间以空格分隔`)的说明：
       ![图片](../imgs/liunx/1.jpg)

       特殊符号说明：
       ![图片](../imgs/liunx/2.jpg)
       特定时间执行案例
       ![图片](../imgs/liunx/3.jpg)
  
  - 应用案例
    - 每隔1分钟将当前日期和日历都追加到 /home/mycal文件中。
      - 1.  写个shell文件，`vim /home/my.sh` 写入内容 `date >> /home/mycal` 和 `cal >> /home/mycal`
      - 2. 给my.sh增加执行权限：`chmod u+x /home/my.sh`
      - 3. crontab -e 增加 `*/1 * * * * /home/my.sh`
