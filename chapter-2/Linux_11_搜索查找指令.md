- 【find】指令，从指定目录向下递归地遍历其各个子目录，将满足条件的文件或者目录显示在终端。
  - 用法：【find [搜索范围] [选项:-name,-user,-size]】
  - 【find /home -name hello.txt】 在`/home`下按名称查找 hello.txt
  - 【find /opt -user jqy 】在`/opt`目录下查找用户jqy的文件。
  - 【find /opt -user jqy -name *.txt 】在`/opt`目录下查找用户jqy的txt文件。
  - 【find /opt -size +200M 】在`/opt`目录下查找大于200M的文件。
    > +200M 大于， -200M小于 ， 200M 等于，单位有:K,M,G

- 【locate】指令 ，可以快速定位文件路径，locate指令利用事先建立的系统中所有文件名称及路径的locate数据库实现快速定位给定的文件。locate指令无需遍历整个文件系统，查询速度较快。为了保证查询结果的准确度，管理员必须定期更新locate数据库。
  -基本用法: 【locate abc.txt】
   > 由于locate指令基于数据库进行查询，所以第一次运行前，必须使用`updatedb`指令创建locate数据库。

- 【which】指令，可以查看某个指令在哪个目录下.
  - 【which ls】 查看`ls` 指令在哪个目录下。


- 【grep】 指令搜索文本内容一般上管道符号 `|`一起使用。
  - 【-n】 显示匹配行及行号
  - 【-i】 忽略字母大小写
  - 如 ： 
      - `【cat 1.txt | grep -ni "hello"】`
      - `【grep -ni "hello" /etc/1.txt】`
     
  

