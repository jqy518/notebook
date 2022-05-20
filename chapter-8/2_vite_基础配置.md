## 基础常用配置
 - `typescript`支持
   
   ```json
   //package.json
   {
       ...
       "typescript": "^4.5.4",
       "vite": "^2.9.5",
       ...
   }
   //tsconfig.json
   {
     "compilerOptions": {
       "target": "esnext",
       "useDefineForClassFields": true,
       "module": "esnext",
       "moduleResolution": "node",
       "strict": true,
       "jsx": "preserve",
       "sourceMap": true,
       "resolveJsonModule": true,
       "isolatedModules": true,
       "esModuleInterop": true,
       "lib": ["esnext", "dom"],
       "skipLibCheck": true
     },
     "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
     "references": [{ "path": "./tsconfig.node.json" }]
   }
   
   //tsconfig.node.json
   {
     "compilerOptions": {
       "composite": true,
       "module": "esnext",
       "moduleResolution": "node"
     },
     "include": ["vite.config.ts"]
   }
   ```
   
   `./src/env.d.ts`内容如下
   
   ```ts
   /// <reference types="vite/client" />
   
   declare module '*.vue' {
     import type { DefineComponent } from 'vue'
     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
     const component: DefineComponent<{}, {}, any>
     export default component
   }
   ```
   
   
   
 - `resolve.alias`资源别名
   
   ```json
   //vite.config.ts
   resolve:{
        alias:{
        "@":resolve(__dirname,'src')
        }
    }
    //tsconfig.json
    compilerOptions:{
        "paths": {
            "@/*": ["./src/*"]
        }
    }
   ```

   > 注意：如果提示找不到 path模块，请安装：npm install @types/node --save-dev
   
- `env`环境变量

   Vite在`import.meta.env`上暴露环境变量。内置的变量有：
  
  ```js
  import.meta.env.MODE: {string} 应用运行的模式。
  import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
  import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
  import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
  ```
  
  
  
  可以在项目根目录下创建`.env`文件,提供客户自定义变量,`注意：只有以VITE_开头的变量会挂到import.meta.env上面`
  
  ```js
  .env                # 所有情况下都会加载
  .env.local          # 所有情况下都会加载，但会被 git 忽略
  .env.[mode]         # 只在指定模式下加载
  .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
  ```
  
  > 环境加载优先级
  >
  > 一份用于指定模式的文件（例如 `.env.production`）会比通用形式的优先级更高（例如 `.env`）。
  >
  > 另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 `.env` 类文件覆盖。例如当运行 `VITE_SOME_KEY=123 vite build` 的时候。
  >
  > `.env` 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效

- env环境变量typecript支持，只需要在`./src`目录下创建一个`.env.d.ts`文件，内容如下：

  ```ts
  /// <reference types="vite/client" />
  
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // 更多环境变量...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  ```

  

  