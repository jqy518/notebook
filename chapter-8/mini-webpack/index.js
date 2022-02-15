import  fs from 'fs';
import parser from '@babel/parser'
import traverse from '@babel/traverse';
import path from "path";
import ejs from 'ejs';
import {transformFromAstSync} from '@babel/core'
let id = 0;
function createAsset(filePath) {
    const source = fs.readFileSync(filePath,{
        encoding:"utf-8"
    });
    const ast = parser.parse(source,{
        sourceType:"module"
    })
    const deps = [];
    traverse.default(ast,{
        ImportDeclaration({node}){
            //收集依赖模块
            deps.push(node.source.value)
        }
    })
    const {code } = transformFromAstSync(ast,null,{
        presets:["env"]
    })
    return {
        id:id++,
        filePath,
        code,
        deps,
        mapping:{}
    }
}

function createGraph() {
    const mainAsset = createAsset("./src/main.js")
    const queue = [mainAsset];
    for(const asset of queue) {
        asset.deps.forEach((relativePath)=>{
            const child = createAsset(path.resolve('./src',relativePath))
            asset.mapping[relativePath] = child.id;
            queue.push(child)
        })
    }
    console.log(queue)
    return queue
}
const graph = createGraph()

function build(graph) {
    const template = fs.readFileSync('./bundle.ejs',{encoding:'utf-8'})
    const data = graph.map((asset)=>{
        return {
            id:asset.id,
            code:asset.code,
            mapping:asset.mapping
        }
    })
    const rcode = ejs.render(template,{data},{})
    fs.writeFileSync("./dist/bundle.js",rcode)
}

build(graph)