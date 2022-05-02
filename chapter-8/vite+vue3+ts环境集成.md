##### 项目初始化

```bash
#第一种方式：按照提示操作并选择模板：vue-ts
#目前支持模板可以通过：https://github.com/vitejs/vite/tree/main/packages/create-vite 查看
yarn create vite
#第二种方式：通过附加的命令选项直接指定项目名称和模板创建
yarn create vite my-vue-app --template vue-ts
```

##### Eslint集成

```bash
#添加eslint依赖
yarn add eslint --dev
#初始化配置按照提示及项目实际需要选择
yarn create @eslint/config
#√ How would you like to use ESLint? · style
#√ What type of modules does your project use? · esm
#√ Which framework does your project use? · vue
#√ Does your project use TypeScript? · No / Yes
#√ Where does your code run? · browser
#√ How would you like to define a style for your project? · guide
#√ Which style guide do you want to follow? · standard
#√ What format do you want your config file to be in? · JavaScript

```

##### npm scripts 中添加验证脚本

```json
"scripts":{
    ...
    "lint": "eslint ./src/**/*.{js,jsx,vue,ts,tsx} --fix"
}
```

##### 修改配置文件

针对VUE3的setup语法糖，及全局defineProps，defineEmits，调整配置：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 全局 defineProps, defineEmits 开启
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 启用vue/script-setup-uses-vars 规则
    'vue/script-setup-uses-vars': 'error'
  }
}

```

##### 集成perttier

> https://github.com/topics/eslint-plugin eslint 插件列表

```bash
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
#安装eslint-config-prettier，作用屏蔽disable其他插件有冲突的eslint规则，如上面配置的plugin:vue/vue3-strongly-recommended部分设置也会受到影响，完全由.prettierrc文件设置来格式化
npm install --save-dev eslint-config-prettier
```

修改`eslint`配置如下:

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 全局 defineProps, defineEmits 开启
    'vue/setup-compiler-macros': true
  },
  //plugin:prettier/recommended放在最后面，这样才能保证覆盖其他扩展的规则
  extends: ['plugin:vue/vue3-recommended', 'standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 启用vue/script-setup-uses-vars 规则
    'vue/script-setup-uses-vars': 'error',
     //有console警告
    'no-console': 1，
    'no-debugger': 'off'
  }
}
```

