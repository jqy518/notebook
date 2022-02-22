# 安装Docker

## ubuntu

```bash
#安装必要的一些系统工具
root@ubuntu1804:~# sudo apt update
root@ubuntu1804:~# sudo apt -y install apt-transport-https ca-certificates curl software-properties-common

#安装GPG证书
root@ubuntu1804:~# curl -fsSL https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
OK

#写入软件源（清华源）信息
root@ubuntu1804:~# sudo add-apt-repository "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

#更新并安装Docker-CE
root@ubuntu1804:~# apt -y update
#安装指定版本的Docker-CE（社区版）
#查看Docker-CE的版本：
root@ubuntu1804:~# apt-cache madison docker-ce
 docker-ce | 5:20.10.12~3-0~ubuntu-bionic | https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu bionic/stable amd64 Packages
 docker-ce | 5:20.10.11~3-0~ubuntu-bionic | https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu bionic/stable amd64 Packages
...
#安装指定版本的Docker-CE：
root@ubuntu1804:~# apt -y install docker-ce=5:19.03.14~3-0~ubuntu-bionic docker-ce-cli=5:19.03.14~3-0~ubuntu-bionic
#使用阿里做镜像加速
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://si7y70hh.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
```

