# 数据结构

### 二叉树

二叉树是度不超过2的树（每个节点最多有两个结点）

##### 满二叉树与完全二叉树

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
            while(treeNode.left! == null) {
                min = treeNode.left;
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

```

