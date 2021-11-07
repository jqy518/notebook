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

  
