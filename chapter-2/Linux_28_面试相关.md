 ## 面试

 - 有一个`log.txt`文件内容如下：
   ```bash
    http://192.168.200.10/index.html
    http://192.168.200.12/index.html
    http://192.168.200.14/index.html
    http://192.168.200.123/index.html
    http://192.168.200.55/index.html
    http://192.168.200.66/index.html
    http://192.168.200.10/index.html
    http://192.168.200.66/index.html
    http://192.168.200.123/index.html
    http://192.168.200.10/index.html
    http://192.168.200.10/index.html
    http://192.168.200.10/index.html
   ```
    1，请统计出各个IP访问的次数
    2，统计结果按大到小进行排序

    ```bash
    #cut 以 ‘/’进行切割行，取第三段，，sort进行排序，uniq 进行统计
    cat log.txt | cut -d '/' -f 3 | sort | uniq -c
    # 进行从大到小排序
    cat log.txt | cut -d '/' -f 3 | sort | uniq -c | sort -nr
    ```
- 统计当前链接到系统的IP情况：
    ```bash
    #awk切割更强大，cut只有切割单空格
    netstat -an | grep ESTABLISHED | awk -F " " '{print $5}' | awk -F ":" '{print $1}' | sort | uniq -c

    ```

- 有如下日志，统计出访问量排在前2的两个IP
  ```bash
  192.168.1.10  index.html
  192.168.1.13  index.html
  192.168.1.55  index.html
  192.168.1.10  index.html
  192.168.1.55  index.html
  192.168.1.72  index.html
  192.168.1.10  index.html
  192.168.1.10  index.html
  ```
 - 方法：
   ```bash
   cat ./access.log | awk -F ' ' '{print $1}' | sort |uniq -c|sort -nr | head -2
   ```
- 使用`tcpdump`监听本机，将来自ip 192.168.200.1 tcp 端口为22的数据，保存输出到tcpdump.log中。


