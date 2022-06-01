#### Rollup 钩子函数

**下面钩子会在服务器启动时调用一次：**

- [options](https://rollupjs.org/guide/en/#options) 替换或操纵`rollup`选项
- [buildStart](https://rollupjs.org/guide/en/#buildstart)开始创建

**下面钩子每次有模块请求时都会被调用：**

- [resolveId](https://rollupjs.org/guide/en/#resolveid)创建自定义确认函数，常用于定位第三方依赖
- [load](https://rollupjs.org/guide/en/#load)创建自定义加载函数，可用于返回自定义的内容
- [transform](https://rollupjs.org/guide/en/#transform) 可用于转换已加载的模块内容

**下面钩子会在服务器关闭时调用一次**

- [buildEnd](https://rollupjs.org/guide/en/#buildend)
- [closeBundle](https://rollupjs.org/guide/en/#closebundle)