## ubuntu

- 一般安装登入后用户都是一般用户，想切换为root用户需要先给root用户设置一个密码：
  - 【sudo passwd】 设置root密码
  -  【su root】 切换root用户

- apt软件包管理
   - 修改源地址，默认是外国服务器，下载很慢或不能下载，修改成国内镜像：
        ```bash
        #修改下面的源配置文件
        /etc/apt/sources.list
        #先备份一份
        sudo cp /etc/apt/sources.list /etc/apt/sources.list.bck
        #再清空sources.list
        echo '' > sources.list


        #拷备清华源，进入下面网站，找到ubuntu,点击旁边的问号选择相应的ubuntu版本拷贝到sources.list里就行
        https://mirrors.tuna.tsinghua.edu.cn/

        #更新源
         sudo apt-get update
        ```
   - apt常用命令

      - **【sudo apt-get update】 更新源**
      - **【sudo apt-get install `package`】 安装包**
      - **【sudo apt-get remove `package`】 删除包**
      - 【sudo apt-cache search `package`】搜索软件包
      - **【sudo apt-cache show `package`】显示包的相关信息**
      - 【sudo apt-get install `package` --reinstall】重新安装包
      - 【sudo apt-get -f install 】修改安装
      - 【sudo apt-get remove `package` --purge 】删除包，包括配置文件等
      - 【sudo apt-get upgrade】安装相关的编译环境
      - 【sudo apt-get dist-upgrade】升级系统
      - 【sudo apt-get depends `package`】了解使用该包依赖哪些包
      - 【sudo apt-cache rdepends `package`】查看该包被哪些包依赖
      - **【sudo apt-get source `package`】下载该包的源代码**

  - 安装SSH和启用
    - 默认Ubuntu上并没安装ssh，我们需要手动安装
    - 【sudo apt-get install openssh-server】下载安装
    - 【service sshd restart】启用ssh