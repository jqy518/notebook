##### 动态导入

在`.env`中我们可以自定义环境变量，如果需要根据环境变量来做动态导入模块的需求，如我们设置如下变量：

```bash
VITE_PROJECT=k22
```

我们需要根据这个值的不同导入不同的模块我们可以如下操作：

```js
const homeModules = import.meta.glob('../pages/HomePage_*.vue')
const routeroptions: RouterOptions = {
  ...
  routes: [
    {
      path: '/home',
      component: homeModules[`../pages/HomePage_${import.meta.env.VITE_PROJECT}.vue`]
    }
  ]
  ...
}
```

