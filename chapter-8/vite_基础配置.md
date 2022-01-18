## 基础常用配置
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