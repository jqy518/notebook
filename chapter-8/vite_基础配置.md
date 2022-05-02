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

.`fast-glob` 