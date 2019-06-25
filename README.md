# vue-template
A template based on vue-webpack-template 1.3.1 for building project easily
> Author：Alan Chen

> version: 0.1.0

> date: 2019/6/25

> Based on vue-webpack-template(1.3.1)

> 一款基于vue-cli2.0的webpack-template集成了一些工程化开发的模板

## Feature
1. 保留所有vue-webpack-template的功能。
2. 启用本地服务器加入了自动获取本地局域网ip，用于局域网开放访问，方便调试。
3. 完全模块化api接口配置和返回数据处理，使http请求更加方便维护。
4. api接口模块和store模块均采用wepack.require自动导入，方便模块使用。
5. 添加两个node脚本，一个脚本是每次dev或prod时候自动记录日期时间和项目依赖项信息，另一个是方便cli可视化git工作流操作(建议根据实际项目定制)。

## Directory Tree
```bash
    ─src
    │  ├─api
    │  |  └─module          api函数的具体接口模块，预处理http请求配置，操作REST接口请求配置主要在这个目录
    │  |  └─Plugins         apiCover函数预处理http请求返回数据的插件目录，内置log日志打印和公共code处理两个插件
    │  |  └─ApiCover        apiCover函数，二次封装api函数，可用于预处理http返回数据
    │  |  └─globalConfig    api函数的全局配置模块
    │  |  └─...
    │  ├─assets
    │  ├─components
    │  ├─libs
    │  └─router
    │  └─store
    │  └─utils
    │  └─views
    └─workFlow
    │  ├─cmd                将git目录里面的node脚本快捷操作的bat批处理文件
    │  ├─git                基于gittask插件可视化git工作流操作
    │  ├─versionUpdate      自动记录日期时间和项目依赖项信息
```

## Usage
1. 使用alan-cli安装，方法见[alan-cli](https://github.com/alanchenchen/alan-cli)
2. npm install 安装所有开发依赖和打包依赖
3. npm start 或者 npm run dev 启动开发环境
4. npm run build 启动打包程序，默认会在项目根目录生产dist文件夹，index.html在dist根目录，其余静态资源放在static文件夹内

## Attentions
1. 模板初始化时，会询问是否使用vuex和gittask插件，如果不使用vuex，则模板初始化后不会自带store目录，如果不使用gittask插件，则不会自带git和cmd目录，但是versUpdate自动记录日期功能会保留
2. 模板工程化的两个思路，api模块化是使用了[api-module](https://github.com/alanchenchen/ApiModule)插件，git工作流cli可视化是使用了[gittask](https://github.com/alanchenchen/GitTask)插件。具体使用方法见对应仓库

## license
* Anti 996(996.ICU)