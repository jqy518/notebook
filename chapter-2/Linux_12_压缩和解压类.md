## 压缩和解压类

- 【gzip/gunzip】 指令 压缩和解压gz格式文件 gzip用于压缩文件，gunzip用于解压的。
  - 【gzip /home/hello.txt】 压缩hello.txt文件（注意:原文件hello.txt则没有了）
     - 【gzip -c test.txt > /root/test.gz】保留原文件
     
  - 【gzip -r /home/hello】对/home/hello目录进行压缩 
     > -r 表示递归压缩，即压缩目录
  - 【gunzip hello.txt.gz】解压hello.txt.gz(一样，原文件会被解压掉)
  - 【gunzip -c hello.txt.gz > hello.txt】 保留原文件

- 【zip/unzip】指令，对压缩和解压zip格式

  - 【zip -r myhome.zip /home/】将`home目录`及其下面的子目录及文件压缩成`myhome.zip`
    > -r 表示递归压缩，即压缩目录
  - 【unzip -d /opt/tmp /home/myhome.zip】 把`/home/myhome.zip`解压到`/opt/tmp`下面。
    > -d 指定目标目录

- 【tar】指令可同时用于压缩和解压。默认后缀`.gz`
   - 【-c】产生`.tar`打包文件
   - 【-v】显示详细信息
   - 【-f】指定压缩后的文件名
   - 【-z】打包同时压缩
   - 【-x】解包.tar文件
   - 例子
     - 【tar -zcvf pc.tar.gz /home/pig.txt /home/cat.txt】将`pig.txt,cat.txt`两个文件压缩成 `pc.tar.gz`
     - 【tar -zcvf home.tar.gz /home/】将`/home`目录压缩成 `home.tar.gz`
     - 【tar -zxvf home.tar.gz】解压 `home.tar.gz`
     - 【tar -zxvf home.tar.gz -C /opt/tmp2】解压 `home.tar.gz` 至 `/opt/tmp2`下面。
