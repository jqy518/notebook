# 数据结构

## 二叉树

二叉树是度不超过2的树（每个节点最多有两个结点）

#### 满二叉树与完全二叉树

一个二叉树，如果每一层的结点树都达到最大值，则称之为满二叉树；

叶节点只能出现在最下层和次下层，并且最下面一层的结点都集中在该层的最左边的位置的二叉树，称之为完全二叉树；

![插入排序](../imgs/9.jpg)

 

<center>满二叉树</center>

![插入排序](../imgs/10.jpg)

<center>完全二叉树</center>

#### 节点对象API设计

| 类名     | Node<Key,Value>                                  |
| :------- | ------------------------------------------------ |
| 构造方法 | Node< key:Key,value:Value,left:Node,right:Node > |
| 成员变量 | left:Node,right:Node, key:Key, value:Value       |

#### 二叉树API设计

| 类名     | BinaryTree                              |
| -------- | --------------------------------------- |
| 成员变量 | private root:Node, <br>private N:number |
| 成员方法 | 增，删，查                              |

#### 二叉树的实现

```javascript

//BinaryTree.ts
//比较接口
interface Compare  {
        compareTo:(key:any)=>number
}
//TreeNode类
class TreeNode<K extends Compare ,V> {
    public key:K
    public value:V
    public left:TreeNode<K,V>
    public right:TreeNode<K,V>
   constructor(key:K,value:V,left:TreeNode<K,V>,right:TreeNode<K,V>) {
       this.key = key;
       this.value = value;
       this.left = left;
       this.right = right;
   }
}
//BinaryTree
class BinaryTree<K extends DataClass.Compare,V>{
    private root:TreeNode<K,V>
    private N:number
    //获取树中元素个数
    public size():number {
        return this.N
    }
    //插入
    public put(key:K,value:V) {
        this.root = this._put(key,value,this.root)
    }
    private _put(key:K,value:V,root:TreeNode<K,V>):TreeNode<K,V> {
        if(!root) {
            root = new TreeNode(key,value,null,null)
        }else {
            if(root.key.compareTo(key) > 0) {
                root.left = this._put(key,value,root.left)
            }else {
                root.right = this._put(key,value,root.right)
            }
        }
        return root
    } 
    
     //获取key的值 
    public get (key:K) {
        return this._get(key,this.root);
    }
    private _get (key:K,node:TreeNode<K,V>):V {
        //node为null
        if(node == null) {
            return null;
        }
        //比较key与node.key的大小
        let c:number = key.compareTo(node.key)
        if(c > 0) {
            return this._get(key,node.right)
        }else if (c === 0) {
            return node.value
        }else {
            return this._get(key,node.left)
        }
    }

    //删除
    public delete (key:K) {
        this.root = this._delete(key,this.root)
    }

    private _delete(key:K, treeNode:TreeNode<K,V>):TreeNode<K,V> {
        let com = key.compareTo(treeNode.key)
        if(com > 0) {
            //如果key大于比较节点的key则继续找比较节点的右子树
            treeNode.right = this._delete(key,treeNode.right)
        }else if(com < 0 ) {
            //如果key小于比较节点的key则继续找比较节点的左子树
            treeNode.left = this._delete(key,treeNode.left)
        }else {
            //如果key等于当前结节key则进行删除有以下三种情况 

            //当前节点右子树为空
            if(treeNode.right == null) {
                return treeNode.left;
            }
            //当前节点左子树为空
            if(treeNode.left == null) {
                return treeNode.right;
            }

            //当前节点左右都有子树,则找出右子树中最小节点，然后再删除右子树最小节点, 替换当前节点。

            //找到右子树最小节点
            let min:TreeNode<K,V> = treeNode.right;
            while(min.left! == null) {
                min = min.left;
            }
            //删除右子树最小节点
            let minParent = treeNode.right;
            while(minParent.left) {
                if(!minParent.left.left) {
                    minParent.left = null
                }else {
                    minParent = minParent.left
                }
            }
            //替换当前节点
            min.left = treeNode.left;
            min.right = treeNode.right;
            treeNode = min;
        }

        //返回当前节点
        return treeNode
    }
    
     //查找整个树中最小的键
    public min():K {
        return this._min(this.root).key
    }

    private _min(x:TreeNode<K,V>):TreeNode<K,V> {
        if(x.left) {
            return this._min(x.left)
        }else {
            return x
        }
    }

    //查找整个树中最大的值
    public max():K {
        return this._max(this.root).key
    }
    private _max(root:TreeNode<K,V>):TreeNode<K,V> {
        if(root.right) {
            return this._max(root.right)
        }else {
            return root;
        }
    }

    //前序遍历：先访问根结点，然后再访问左子树，最后访问右子树。
    public preErgodic():Array<K> {
        let list:Array<K> = []
        this._preErgodic(this.root,list)
        return list;
    }
    private _preErgodic(x:TreeNode<K,V>,list:Array<K>){
        //如果x为空直接返回
        if(!x){
            return;
        }
        //把x结点的key放入list
        list.push(x.key)
        //递归遍历x的左子树
        this._preErgodic(x.left,list)
        //递归遍历x的右子树
        this._preErgodic(x.right,list)
    }

    //中序遍历：先访问左子树，中间访问根节点，最后访问右子树。
    public midErgodic():Array<K>{
        let list:Array<K> = [];
        this._midErgodic(this.root,list)
        return list;
    }
    private _midErgodic(x:TreeNode<K,V>,list:Array<K>) {
        if(!x){
            return 
        }
        //先遍历左子树
        if(x.left){
            this._midErgodic(x.left,list)
        }
        //把x的key放入list中
        list.push(x.key)
        //再遍历右子树
        if(x.right){
            this._midErgodic(x.right,list)
        }
    }

    //后序遍历：先访问左子树，再访问右子树，最后访问根节点。
    
    
}


//------示例

class Key implements DataClass.Compare {
    value:number;
    constructor(value:number) {
        this.value = value;
    }
    compareTo(k:Key) {
        if(this.value > k.value) {
            return 1;
        }else if(this.value === k.value) {
            return 0;
        }else {
            return -1;
        }
    }
}

let myTree = new BinaryTree<Key,String>()

let key = new Key(92);
myTree.put(new Key(22),'xiaozhang')
myTree.put(new Key(82),'xiaoming')
myTree.put(new Key(12),'xiaoli')
myTree.put(key,'xiaowang')
myTree.put(new Key(62),'xiaocai')
myTree.put(new Key(32),'xiaoguang')
myTree.put(new Key(52),'xiaoxiong')

console.log(myTree.get(key))
myTree.delete(key)
console.log(myTree)

```

### 折纸问题

一张纸对折N次，问每条折痕的朝向，用up,down表示。

```javascript
class PageNode {
    value:string
    left:PageNode
    right:PageNode
    constructor(value:string,left:PageNode,right:PageNode) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class PageFoldingTest {
    root:PageNode
    constructor(n:number) {
        for(let i = 0; i<n; i++) {
            if(i === 0) {
                this.root = new PageNode('down',null,null);
            }else {
                let queue:Array<PageNode> = [];
                queue.push(this.root);
                while(queue.length > 0) {
                    let item = queue.shift();
                    if(item.left) {
                        queue.push(item.left)
                    }else {
                        item.left = new PageNode('up',null,null)
                    }
                    if(item.right) {
                        queue.push(item.right)
                    }else {
                        item.right = new PageNode('down',null,null)
                    }
                }
            }
        }
    }
    //中序遍历
    private midErgodic():Array<string> {
        let list:Array<string> = []
        this._midErgodic(this.root,list)
        return list;
    }
    private _midErgodic(x:PageNode,list:Array<string>):void {
        if(!x) {
            return;
        }
        if(x.left) {
            this._midErgodic(x.left,list)
        }
        list.push(x.value)
        if(x.right) {
            this._midErgodic(x.right,list)
        }
    }
    print() :void{
        console.log(this.midErgodic())
    }
}

//测试
let pa = new PageFoldingTest(3)
pa.print()
```



## 堆

####  堆的定义

堆是计算机科学中一类特殊的数据结构的统称，堆通常可以被看做是一棵完全二叉树的数组对象。

##### 堆的特性：

1. 它是完全二叉树，除了树的最后一层结点不需要是满的，其它的每一层从左到右都是满的，如果最后一层结点不是满的，那么要求左满右不满。

![插入排序](../imgs/6.jpg)

2. 它通常用数组来实现。
具体方法就是将二叉树的结点按照层级顺序放入数组中，根结点在位置1，它的子结点在位置2和3，而子结点的子结点则分别在位置4，5，6，和7，以些类推。

![插入排序](../imgs/7.jpg)

####  堆的API设计

![插入排序](../imgs/8.jpg)

####  堆的实现

```javascript
/// <reference path="../dataClass.ts" />
//泛型T需要有一个返回boolean值的compareTo方法
class Heap<T extends DataClass.Compare> {
    private items:Array<T>
    private N:number = 0  //堆元素数量

    constructor() {

    }

    //判断堆中索引i处的元素是否小于索引j处的元素
    private less(i:number,j:number):boolean {
        let c = this.items[i].compareTo(this.items[j])
        if(c<=0) {
            return true;
        }else {
            return false
        }
    }
    
    //交换堆中i索引和j索引处值
    private exch(i:number,j:number):void {
        let temp:T = this.items[i]
        this.items[i] = this.items[j]
        this.items[j] = temp
    }

    //插入一个元素
    public  insert (t:T):void {
        this.items[++this.N] = t;
        this.swim(this.N)
    }

    //使用上浮算法，使索引k处的元素能在堆中处于一个正确的位置
    private swim(k:number) {
        //通过循环不断的比较当前结点的值和其父结点的值，如果发现父结点的值 比当前结点的值小，则交换位置。
        while(k>1){ //因为从1开始插入值
            let pk = parseInt(k/2+'');
            if(this.less(pk,k)){
                this.exch(pk,k)
            }
            k = pk;
        }
    }

    //删除堆中最大的元素，并返回这个最大元素 ,最大元素就是根结点索引1处的元素，要删除这个元素采用步骤：
    //1,交换1与N(未位)处的元素，再删除并返回N处的元素，下沉1处的元素使堆有序
    public  delMax():T {
        //交换
        this.exch(1,this.N)
        //删除N处元素
        let max = this.items.pop()
        this.N--;
        //下沉
        this.sink(1)
        //返回max
        return max
    }

    //使用下沉算法，使索引k处的元素能在堆中处于
    private sink(k:number) {
        //比较左子节点（2k）与右子节点(2k+1)的大小，取较大的一个与k处元素比较，如果k处元素小则交换（下沉）
        while(2*k < this.N) {
            let max:number
            if(2*k+1 <=this.N){ //存在右子结点
                if(this.less(2*k,2*k+1)){ 
                    max = 2*k + 1;
                }else {
                    max = 2*k;
                }
            }else {
                max = 2*k;
            }
            if(!this.less(k,max)) {
                break
            }else {
                this.exch(k,max)
                k = max;
            }
        }
    }

}


//测试
class Student implements DataClass.Compare {
    public name:string
    public age:number
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age
    }
    public compareTo(x:Student) {
        if(this.age > x.age) {
            return 1;
        }else if(this.age === x.age) {
            return 0;
        }else {
            return -1;
        }
    }
}
let heaptest = new Heap<Student>();
heaptest.insert(new Student('A',12))
heaptest.insert(new Student('B',23))
heaptest.insert(new Student('C',35))
heaptest.insert(new Student('D',1))
heaptest.insert(new Student('E',13))
heaptest.insert(new Student('F',16))
heaptest.insert(new Student('G',10))

let max:Student;
while((max = heaptest.delMax())!=null) {
    console.log(max.name)
}
```

### 利用堆对数组进行排序

循环堆的 `dexMax`方法可以得到的一个倒序数组。如果我们要从小到大进行排序，可以利用堆进行如下实现：

```javascript
//利用堆进行排序

class HeapSort<T extends DataClass.Compare> {
    private heap:Array<T> = []
    private less(a:number,b:number) {
        return this.heap[a].compareTo(this.heap[b]) < 0;
    }

    private exch(i:number,j:number) {
        let tmp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = tmp
    }    

    public sort(arr:Array<T>):Array<T>{
        //创建堆
        this.createHeap(arr)
        //对堆进行排序，我们知道堆中最大值是索引1处的元素，则我们：
        //1,交换索引1处与未尾元素；
        //2,1处元素进行下沉操作，（注意下沉的范围不包括未尾元素）
        //下沉后堆中最大值又处在1处，循环步骤1，最后能得到一个有序的堆。 
        let max = this.heap.length -1;
        while(max > 1) {
            //交换
            this.exch(max,1);
            //下沉
            this.sink(1,--max)
        }
        return this.heap.slice(1)
    }

    private createHeap(source:Array<T>):void {
        //拷贝源数组创建一个无序的堆
        this.heap = [null,...source]
        //对堆中元素进行下沉调整使其有序（此处从长度的一半处开始，因为一半以下都是叶子节点不需要下沉调整）
        for(let i = parseInt((this.heap.length/2)+''); i>0;i--) {
            //对i处元素进行下沉调整，范围是到整个堆末端。
            this.sink(i,this.heap.length -1)
        }
    }

    private sink(target:number,range:number):void {
        while(2*target <= range) { //有左子节点
            //找出最大值
            let max:number = 2* target;
            if(2*target+1 <=range) { //有右子节点
                if(this.less(2*target,2*target+1)) {
                    max = 2*target + 1;
                }
            }
            //比较当前target处的值与max处的值，
            if(!this.less(target,max)) { 
                break //结束循环。
            }
            //交换并继续往下走
            this.exch(target,max)
            target = max;

        }
    }
}

let sortArr = [
    new Student('A',12),
    new Student('C',15),
    new Student('D',11),
    new Student('F',19),
    new Student('Q',9),
    new Student('Z',12)
]

let heapSort = new HeapSort()
console.log(heapSort.sort(sortArr))
```

## 最大优先队列

上面学的堆就算是一个最大优化队列，`delMax` 每次都是删除最大的值 ；

## 最小优先队列

最小优化队列则与最大优先队列相反，最小值放在第一位，实现如下：

```javascript
/// <reference path="../dataClass.ts" />

class MinPriorityQueue <T extends DataClass.Compare> {
  private queue:Array<T> = []
  private N:number = 0
  
  //插入元素
  public add (item:T) :void {
       this.queue[++this.N] = item;
       this.swim(this.N)
  }

  //删除最小
  public delMin():T {
      if(this.N > 0){
         this.exch(1,this.N)
         let min = this.queue.pop()
          this.N--;
          this.sink(1)
          return min;
      }else {
          return null
      }
  }

  //是否为空
  public isEmpty():boolean {
     return this.N=== 0 ? true :false;
  }

  //获取size
  public getSize():number {
      return this.N;
  }
  //上浮
  public swim(k:number) {
      //与其父元素k/2比较，如大则交换元素
      let parentKey:number = parseInt(k/2+'')
      while(parentKey >= 1) {
          //比较的时候与最大优化队列相反，如果小则交换
        if(this.less(k,parentKey)) {
            this.exch(parentKey,k)
            k = parentKey
            parentKey =parseInt(k/2+'') ;
        }else {
            break
        }
      }
  }

  //下沉(下沉后能保证最大值在上面)
  public sink (i:number) {
    //当有左子节点
     while(2*i <=this.N) {
         //找出左右节点中最小的。先假设最小值为左节点
         let min = 2*i;
         //当有右节点，进行左右比较
        if(2*i+1 <=this.N) {
            if(this.less(2*i+1,min)) {
                min = 2*i +1;
            }
        }
        //比较当前值与最小子节点如果大则交换，否则跳出
        if(this.less(min,i)) {
            this.exch(min,i)
            i = min;
        }else {
            break
        }
     }
  }
  //比较
  private less(i:number,j:number):boolean {
    if(this.queue[i].compareTo(this.queue[j]) >= 0) {
        return false;
    }else {
        return true;
    }
  }

  //交换
  public exch(i:number,j:number) {
     let temp:T = this.queue[i]
     this.queue[i] = this.queue[j]
    this.queue[j] = temp;
  }
}

class Man implements DataClass.Compare {
     private age:number;
     name:string;
     constructor(name:string,age:number) {
         this.name = name;
         this.age = age;
     }
     public compareTo(x:Man):number {
        if(this.age > x.age) {
            return 1;
        }else if(this.age === x.age) {
            return 0;
        }else {
            return -1;
        }
     }
}

//测试

let minQueue = new MinPriorityQueue()
minQueue.add(new Man('A',90))
minQueue.add(new Man('B',20))
minQueue.add(new Man('C',1))
minQueue.add(new Man('D',30))
minQueue.add(new Man('E',10))
minQueue.add(new Man('F',60))

while(minQueue.getSize() > 0) {
    console.log(minQueue.delMin())
}
```

## 索引优先队列

最大和最小优先队列可快速的访问到队列中的最大元素和最小元素，但有一个缺点，就是没办法通过索引访问已经存在于优先队列中的对象，并更新它们。为了实现这个目的，在优先队列的基础上，我们有了索引优先队列。

索引优先队列中有三个关键成员变更：

`items` ：用来存储元素的数组

`pq` ：保存每个元素的items数组中的索引，pq数组需要`堆有序`

`qp`： 保存pq的逆序，即pq的值作为索引，pq的索引做为值。

这样我们可以通过qp快速找到元素索引在堆pq中的索引，对元素进行定位查找或修改。



```javascript
/// <reference path="../dataClass.ts" />
class IndexMinPriorityQueue <T extends DataClass.Compare> {
     items:Array<T> = []; //用来存储元素的数组
     pq:Array<number> = []; // 保存每个元素的items数组中的索引，pq数组需要堆有序
     qp:Array<number> = [];//保存pq的逆序，pq的值作为索引，pq的索引做为值。
     N:number = 0;

    constructor(src:Array<T>) {
        if(src) {
            for(let i = 0; i<src.length; i++) {
                this.insert(i+1,src[i])
            }
        }
    }

     private less(i:number,j:number):boolean {
        if(this.items[this.pq[i]].compareTo(this.items[this.pq[j]]) <0) {
            return true;
        }else {
            return false;
        }
     }

     private exch(i:number,j:number):void {
         //交换pq数组
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
        //更新qp;
        this.qp[this.pq[i]] = i;
        this.qp[this.pq[j]] = j;
     }
     //删除队列中最小的元素
     public delMin():T {
        //先交换
        this.exch(1,this.N);
        //删除pq中最小的
        let minIndex = this.pq.pop();
        //更新qp中对应的元素
        this.qp[minIndex] = -1;
        //更新item中对应的元素
        let min:T  = this.items[minIndex]
        this.items[minIndex] = null;
        //N--
        this.N--;
        //下沉操作
        this.sink(1)
        return min;
     }

     //插入
     public insert(i:number,t:T):void {
         if(i<1 || this.contains(i)) {
             throw new Error('索引不能小于1或元素存在')
         }else {
            //把元素插入到items对应的i位置
             this.items[i] = t;
             //N++
             this.N++;
            //把i存储到pq
             this.pq[this.N] = i;
             //通过qp来记录pq中的i
             this.qp[i] = this.N
             //上浮
             this.swim(this.N)
         }
     }

     //上浮
     private swim(i:number) {
        while(parseInt(i/2+'') >=1) {
            let min = parseInt(i/2 + '')
            if(this.less(i,min)) {
                this.exch(i,min)
                i = min;
            }else {
                break
            }
        }

     }
    //下沉
     public sink(i:number):void {
        while(2*i <=this.N) {
            let min = 2*i;
            if((2*i+1)<=this.N) {
                if(this.less(2*i+1,min)) {
                    min = 2*i + 1;
                }
            }
            if(this.less(min,i)) {
                this.exch(i,min)
                i = min;
            }else {
                break;
            }
        }
     }
     //获取队列中元素的个数
     public size():number {
         return this.N;
     }
     //判断队列是否为空
     public isEmpty():boolean {
         return this.N === 0;
     }
     //是否存在元素
     public  contains(k:number):boolean {
        return this.qp[k] && this.qp[k] != -1;
     }
     //修改元素
     public changeItem(i:number,t:T) {
        if(this.contains(i)) {
            this.items[i] = t;
            let j = this.qp[i]
            //先上浮
            this.swim(j)
            //再下沉
            this.sink(j);
        }
     }
     //最小元素关联的索引
     public minIndex():number {
         return this.pq[1];
     }
     //删除元素
     public delete(i:number):T {
         //先交换
         this.exch(i,this.N)
         //删除pq中N处的元素
         let delIndex = this.pq.pop();
         //N--
         this.N--;
         //同步清除qp中的数据
         this.qp[delIndex] = -1;
         //同步清除items中的位置
         let delItem = this.items[delIndex]
         this.items[delIndex] = null;
         return delItem;
     }
 }

 //测试

let arr:Array<DataClass.Man> = [];
arr.push(new DataClass.Man('A',12))
arr.push(new DataClass.Man('B',10))
arr.push(new DataClass.Man('D',13))
arr.push(new DataClass.Man('E',11))
 let indexQueue = new IndexMinPriorityQueue(arr);
 console.log(indexQueue)
 console.log(indexQueue.delMin())
 console.log(indexQueue.delMin())
 console.log(indexQueue.delMin())
 console.log(indexQueue.delMin())
 indexQueue.insert(1,new DataClass.Man('A',12))
 indexQueue.insert(3,new DataClass.Man('B',10))
 indexQueue.insert(2,new DataClass.Man('D',13))
 indexQueue.insert(4,new DataClass.Man('E',11))

 indexQueue.changeItem(3,new DataClass.Man('HAHA',30))

 console.log(indexQueue.delMin())
 console.log(indexQueue.delMin())
 console.log(indexQueue.delMin())
 console.log(indexQueue.delMin())
```





