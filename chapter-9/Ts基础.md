### TypeScript 基础类型

- Boolean

  ```ts
  let isok:boolean = false;
  ```

  

- Number

- String

- Array

- Tuple

- Enum

- Unknown

- Any

- Void

- Null 和 Undefined

- Never

### 接口 interface

##### 对象接口：

```ts
interface MyInterface {
    label:string;
    color?:string; //可选属性
    readonly name:string; //只读属性
    numbers:ReadonlyArray<number|string>; //只读的数组
}
```



##### 添加一个接口不存在的属性的两种方法：

向`MyInterface`类型的对象中添加一个不存在的属性，会报错，下面的两种方式可以绕开检查：

```ts
let myObj:MyInterface = {
    coluor:'red', //不存在`coluor`属性：报错：对象文字只能指定已知的属性
    name:'zhangsan'
    ...
}
//绕开方法一（最简）：类型断言
let myObj = {
    coluor:'red', 
    name:'zhangsan'
    ...
} as MyInterface
//绕开方法二（最佳）：字符串索引签名
interface MyInterface {
    label:string;
    color?:string; 
    readonly name:string; 
    numbers:ReadonlyArray<number|string>; 
    [propName:string]:any //字符串索引签名
}
```

##### 索引签名

如上例所未，接口中可以使用索引签名，索引签名参数类型必须为：`string`,`number`,`symbol`; 并且`number`类型是`string`类型的子类（typescript会把number转为string）；这两种同时出现时，返回类型`最好保持一致`要不会出现问题。

```ts
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误定义：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  [x: number]: Animal;
  [y: string]: Dog;
}
```

