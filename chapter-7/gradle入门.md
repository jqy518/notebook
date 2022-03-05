## gradle入门

##### gradle  官网下载地址

```html
#下载带有bin文字的版本
https://gradle.org/releases/
#解压
#添加环境变量
GRADLE_HOME :D:\soft\gradle\gradle-7.3.3
path 添加 %GRADLE_HOME%\bin
```

##### hello world

```groovy
1、//编写build.gradle内容如下
task hello {
    println "hello gradle"
}
2、//同目录下执行

gradle -q hello

```

#### gradle warpper

- 运行`gradle warpper` 会在根目录下生成gradle进行环境，这样有利团队合作开发，不需要每台电脑都安装`gradle`就可以进行gradle了。生成文件也构建了一个标准的gradle工程

```bash
├─.gradle
└─gradle
    └─wrapper
       └─gradle-wrapper.jar              #执行脚本最终调用的JAR包，包含运行时的逻辑代码
       └─gradle-wrapper.properties       #gradle运行环境文件路径及gradle版本配置文件
├─build.gradle
├─gradlew                                #linux下的执行脚本
├─gradlew.bat                            #window下的执行脚本
```

##### gradle-wrapper.properties  说明 

```properties
#Gradle 解包后存储的父目录;
#GRADLE_USER_HOME：~\.gradle\wrapper\dists
distributionBase=GRADLE_USER_HOME
#distributionBase指定目录的子目录。distributionBase+distributionPath就是 Gradle 解包后的存放的具体目录;
distributionPath=wrapper/dists
#Gradle 指定版本的压缩包下载地址;
distributionUrl=https\://services.gradle.org/distributions/gradle-7.3.3-bin.zip
#Gradle 压缩包下载后存储父目录;
zipStoreBase=GRADLE_USER_HOME
#zipStoreBase指定目录的子目录。zipStoreBase+zipStorePath就是 Gradle 压缩包的存放位置
zipStorePath=wrapper/dists
```

> Tips： 这里我们需要关注 distributionUrl 这个字段，我们经常会遇到升级 AndroidStudio 后项目初始化编译缓慢的问题。这个问题就是升级后 AndroidStudio 会自定改掉gradle-wrapper.properties里面 distributionUrl 字段 Gradle 的版本号。遇到这个问题我们不慌，可以将该字段改为我们本地已经下载好的版本号。修改完成后重启 AndroidStudio 就可以很快编译通过了。

##### JAVA和Android gradle工程目录

![](D:\code\2020\notebook\imgs\gradle\1.jpg)

- 可以看到比我们生成的通过`gradle wrapper`生成的目录多了一个setting.gradle

  - Gradle支持多工程构建，使用settings.gradle来配置添加子工程(模块)

    settings文件在`初始化阶段执行`，创建Settings对象，在执行脚本时调用该对象的方法

    Settings.include(String... projectPaths)

    - 将给定的目录添加到项目构建中，':app'表示文件相对路径，相当于'./app'文件夹
    - 多项目架构进行分层，把同层次的子工程放在同一文件夹下便于管理，使用':xxx:yyy'表示

##### gradle 生命周期

`Initialization` 

- Gradle支持单项目和多项目构建。在初始化阶段，Gradle确定哪些项目将参与构建，并为每个项目创建Project实例，一般我们不会接触到它。(比如解析settings.gradle)

`Configuration`

- 配置阶段，解析每个工程的build.gradle文件，创建要执行的任务子集和确定各种任务之间的关系，并对任务的做一些初始化配置。
- 解析每个Project中的build.gradle，解析过程中并不会执行各个build.gradle中的task。
- 经过Configration阶段，Project之间及内部Task之间的关系就确定了。一个Project包含很多Task，每个Task之间有依赖关系。Configuration会建立一个有向图来描述Task之间的依赖关系，所有Project配置完成后，会有一个回调project.afterEvaluate()，表示所有的模块都已经配置完了。

`Execution`

- 运行阶段，Gradle根据配置阶段创建和配置的要执行的任务子集，执行任务。

![](D:\code\2020\notebook\imgs\gradle\2.jpg)