## rpm 包的管理

 - 【rpm -qa | grep xxxx】 查询已安装的rpm列表。 xxxx为关键字。
 - 【rpm -qi 软件包名】 查询软件的详情。 软件包名需要写完整。
    如：
   ```bash
    google-chrome-stable-93.0.4577.63-1.x86_64
    # 完整软件包名为:google-chrome-stable
   ```
- 【rpm -ql 软件包名】 以全路径的方式查询软件包包含的文件，`这个命令对于找配置文件及软件安装位置很有帮助`。
- 【rpm -qf 文件全路径名】 查询某个文件所属的软件包。

- 【rpm -e 软件包名】 删除软件包
  - 案例：
    ```bash
     rpm -e firefox
     # 或
     rpm -e --nodeps firefox  #强制删除，有些包被其他包依赖时删除不掉，可以带上--nodeps,但一般不推荐这样做。
    ```

- 【rpm -ivh RPM包全路径名称】 安装软件包

   - 【-i】 install 安装。
   - 【-v】verbose提示
   - 【-h】hash 进度条


## yum软件包管理

 - yun是一个Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载 RPM包并安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。

 - 【yum list | grep xxx】 查寻软件名为xxx的列表。
 - 【yum install xxxx】 下载安装。

  
