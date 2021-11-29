## shell 编程

- Shell是一个命令行解析器，它为用户提供了一个向Linux内核发送请求以便运行程序的界面系统级程序，用户可以用Shell来启动、挂起、停止甚至是编写一些程序。

- 第一个shell脚本：`hello.sh`
  ```bash
  #!/bin/bash
  echo "hello world!!!!"
  ```

- 执行shell脚本有两种方式：
  - 给`hello.sh`添加执行权限：`chmod u+x ./hello.sh` 然后就可以执行了。
  - 或直接执行`sh ./hello.sh`

## shell 变量
 - Linux Shell中的变量分为，系统变量和用户自定义变量。
   - 系统变更：`$HOME,$PWD,$SHELL,$USER`等等，可以用`echo $SHELL`。
   - 显示当前shell中所有变量：【set】

 - shell变量的定义：
   - 定义变更的规则
     - 变量名称可以由字母、数字、和下划线组成，但是不能以数字开头。
     - 等号两侧不能有空格。
     - 变量名称一般习惯为大写。
   - 定义变量： `变量=值`
   - 撤销变量： `unset 变量`
   - 声明静态变量： `readonly 变量,注意：不能unset`
   - 将命令的返回值赋给变量
     - A=\`date\` 反引号，运行里面的命令并把结果返回给变量A。
     - 或 A=$(date)。
- 设置环境变量
  1. export 变量名=变量值 （功能描述：将shell变量输出为环境变量/全局变量）
  2. source 配置文件 （功能描述：让修改后的配置信息立即生效,但自定义的shell配置文件重启之后就失效了）
  3. echo $变量名

  > 1. 系统环境变量定义在`/etc/profile`中

- shell文件多行注释`:<<!...代码内容...!`
  ```bash
  :<<!
   #要注释的内容....
  !
  ```

- 位置参数变量
  - 当我们执行一个shell脚本时，如果希望获取到命令行的参数信息，就可以使用位置参数变量。如：`./myshell.sh 100 200`，想要获取`100,200`这两个参数要怎么做？

  - `$n`: `$1~$9`; 代表第1个到第9个参数，第十个及以上的参数需要用大括号包裹如：`${10}`
  - `$*`:这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体。
  - `$@`:这个变量也代表命令行中所有的参数，不过$@把每个参数区分对待。
  - `$#`:这个变量代表命令行中所有参数的个数。
- 预定义变量
  - `$$`:当前进程 的进程号（PID）
  - `$!`:后台运行的最后一个进程的进程号
  - `$?`:最后一次执行的命令的返回状态。如果这个变量的值为0，证明上一个命令正确执行;如果这个变量的值为非0（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确了。
   
- 运算符
  - `$((运算表达式))` 或 `$[运算式]` 或者 `expr m + n `
  - 注意`expr`运行符间要有空格，如果希望将expr的结果赋给某个变量，使用"``"反引号包裹。expr中：乘号需要转义：`\*`。
- 条件判断
  - `=` : 用于字符串判断
  - 两上整数的比较
    - `-lt` : 小于
    - `-le` : 小于等于
    - `-eq` : 等于
    - `-gt` : 大于
    - `-ge` : 大于等于
    - `-ne` : 不等于
  - 按照文件权限进行判断
    - `-r` : 有读取权限
    - `-w` : 有写入权限
    - `-x` : 有执行权限
  - 按照文件类型进行判断
    - `-f` : 文件存在并且是一个常规的文件
    - `-e` : 文件存在
    - `-d` : 文件存在并且是一个目录

- 案例：
  ```bash
  #!/bin/bash
  if [ "ok" = "ok" ]
  then
          echo "equal"
  fi
  NOW_DAY=$(date +%d)
  if [ 20 -ge $NOW_DAY ]
  then
          echo "day=$NOW_DAY"
  fi
  if [ -f ./aa.txt ]
  then
          echo "hello world !!!" > ./aa.txt
  fi
  ```

- 流程控制
  - `if...elif...fi`
    ```bash
    #!/bin/bash
    if [ $1 -gt 60 ]
    then
            echo "及格了！！！！"
    elif [ $1 -eq 60 ]
    then
            echo "加油！！！！！"
    elif [ $1 -lt 60 ]
    then
            echo "lose....."
    fi
    ```
  - case语句
    ```bash
      #!/bin/bash
      case $1 in
      "1") 
              echo "周一"
      ;;
      "2")
              echo "周二"
      ;;
      *)
              echo "其他"
      ;;
      esac
    ```
  - for循环
     - `for 变量 in 值1 值2 值3 ...`,`for((初始值;循环条件；变量变化))`  
     ```bash
       #!/bin/bash
      for i in $*
      do
              echo "i=$i"
      done
      #如果用引号引起来，$*会被看着一个整体
      for k in "$*"
      do
              echo "args=$k"
      done

      for j in "$@"
      do
              echo "j=$j"
      done

      for(( l=0; l<=10; l++))
      do
              echo "l=$l"
      done

     ```

  - while循环
    - `while [条件] do ... done`
     ```bash
      #!/bin/bash
      SUM=0
      i=0
      while [ $i -le $1 ]
      do
              SUM=$[$SUM+$i]
              i=$[$i+1]
      done
      echo "SUM=$SUM"
     ```
  - read获取输入
      - 【-p】提示语
      - 【-t】规定输入时间
    ```bash
      #!/bin/bash
      #读取一个数赋值给变量NUM
      read -p "请输入数字：" NUM

      echo "你刚才输入的数字是：$NUM"

      read -t 10 -p "请在10秒内输入你的答案：" RESULT
      echo "你的答案是:$RESULT"

    ```

  - 系统函数
    - 【basename】 返回完整路径最后`/`的部分，常用于获取文件名
      - 语法：`【basename [pathname] [suffix]】`如果有suffix则后缀也会删除
        ```bash
          basename /home/root/aa.txt #返回 aa.txt
          basename /home/root/aa.txt .txt #返回 aa
          #将结果赋值给变量
          basename /home/root/aa.txt FILE_NAME
          echo FILE_NAME
        ```
    - 【dirname】返回完整路径最后`/`的前面部分，与basename正好相反
      ```bash
        dirname /home/root/aa.txt #返回 /home/root
        #将结果赋值给变量
        dirname /home/root/aa.txt DIR_PATH
          echo DIR_PATH
      ```

  - 备份数据库案例
    ```bash
    #!/bin/bash
    #备份目录
    BACKUP=/home/jqy/shellTest/backup
    #当前时间
    DATATIME=$(date +%Y-%m-%d_%H%M%S)
    echo $DATATIME
    #数据库地址
    HOST=localhost
    #数据库用户名
    DB_USER=root
    #数据库密码
    DB_PASSWD=xxxxxxx
    #备份的数据库名
    DATABASE=webdata
    #如果不存在就创建目录
    [ ! -d "${BACKUP}/${DATATIME}" ] && mkdir -p "${BACKUP}/${DATATIME}"
    mysqldump -u${DB_USER} -p${DB_PASSWD} -q -R --databases ${DATABASE} > ${BACKUP}/${DATATIME}/${DATATIME}.sql
    #压缩文件
    cd ${BACKUP}
    tar -zcvf $DATATIME.tar.gz ./${DATATIME}/
    rm -rf ./${DATATIME}

    ```


