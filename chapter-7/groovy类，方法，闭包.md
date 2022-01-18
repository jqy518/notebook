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

- 通过`def` 申明变量。没有严格的类型检查。
- 使用'.@'直接访问变量，跳过默认的getter/setter方法调用

