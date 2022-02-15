### 变量申明及getter和setter

```groovy
class Car {
    def miles
    def year = "2020202.."
    def name = "特斯拉"
    def numberv = 200
    //定义getter
    def getMiles() {
        print "getMiles"
        return miles
    }
    //定义setter
    def setMiles(miles) {
        println "setMiles"
        this.miles = miles;
    }
    def getName() {
        println "getName...."
        return name;
    }
    def run() {
        println numberv
        numberv = 600
        println numberv
        println numberv
        //可以转成string
        numberv = "600str"
        println numberv
    }
}

def car = new Car();
//会调用setter方法
car.miles=20000
//会调用getter方法
println car.miles+'\n\n'
//不会调用getter方法
car.@miles=1000
println car.@miles+'\n\n'
car.run()
```

- 通过`def` 申明变量。没有严格的类型检查。并且变量类型是动态的`给它什么值，它就是什么类型`

### 变量类型动态性

```groovy
class User {
    def name = "hqk"
    String age
    void setName(String name) {
        println "setName(string name)"
        this.name = name;
    }
    void setName(Object name) {
        println "setName(Object name)"
        this.name = name
    }
}

def user  =new User();
def objName = new Object();
user.name = objName
println name.class /*打印：java.lang.Object*/

def Object name = "jqy"
println name.class /*打印：java.lang.String*/

println user.name.class;
user.name = name
println user.name.class /*打印：java.lang.String*/
println '\n'
```



- 使用'.@'直接访问变量，跳过默认的getter/setter方法调用

```groovy
//string字面量
//单行
def foo = "this is a string";
//多行,但第一行会是一个换行符
def mline = '''
line one
line two
line three
''';
//多行,去除每一行的换行换加"\"
def mline = '''\
line one
line two
line three
''';
//插入表达式，只支持双引号方式。
def age = '19';
def name = "zhangsan_age:${age}";
//访问对象的属性可以去除{},但方法，闭包等不行
def person = [name:[first:'zhang',last:'san'],age:36];
println "$person.name.first $person.name.last is $person.age years old!";


```

- 字符串用单引号，双引号，或三引号（多行）包裹。
- 插入表达式可以用`${}`,只支持在双引号中。

