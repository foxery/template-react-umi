# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 目录结构

```
|-- src 源代码目录
    |-- pages 页面目录
        |-- components 业务组件目录
        |-- index 分模块目录
            |-- Index.tsx 页面组件
            |-- Index.less 页面样式文件

    |-- components 基础组件目录
        
    |-- assets  资源文件目录
        |-- img  图片文件目录
        |-- less 样式文件目录
        
    |-- layouts  模板目录

    |-- models   状态管理目录
        |-- module1  分模块目录

    |-- routes   路由管理目录
        |-- module1  分模块目录

    |-- services   网络请求目录
        |-- Http.ts  请求器封装文件
        |-- ModuleApi.ts  分模块接口文件

    |-- utils   公共工具目录
        |-- Auth.ts  权限控制文件
        |-- Fn.ts  常用函数文件  
        
    |-- wrappers   页面路由权限控制目录
        |-- auth            
            |-- Auth.tsx

|-- .umirc.dev.ts 开发环境配置文件
|-- .umirc.ts 正式环境配置文件
|-- mock 公共api-mock 文件目录 
|-- dist 打包后的项目目录
|-- public 公共静态资源目录

```        