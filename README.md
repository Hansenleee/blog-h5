# NBU-Vue-Cli
> 基于`Vue+Node`的脚手架，目前Node只在本地开放时运行。

# 命令说明
## 安装依赖
```
  npm install
```
## 本地启动开发
```
  npm run dev
```
## 打包配置
```
  npm run build
```

# 脚手架功能
* 基于rem的移动端自适应，利用了`postcss + pxtorem`，写样式时直接根据UI稿的px来书写，不需要人为的转换。
* webpack在书写文档时是`2.*`版本，之后会升级到`4.*`，做了chunk的提取，css的抽离、组件的异步加载等

# 纯前端架构
## 样式css
目前支持stylus和less、less(是为了兼容老版本的样式)。个人推荐使用stylus，在`src/assets/style`下会逐步增加样式的全局解决方案，  
包括移动端1px解决方案(svg)、flex布局方案、颜色和字体大小的统一处理方案、iconfont引入等等
## Eslint
前端层面加入了Eslint强校验，在`config/index.js`可配置警告级别，根目录下的`.eslintrc.js`有Eslint校验规则。另外在运行`npm install`时会执行`githooks/install.js`,会在当前项目根目录下`.git/hooks/...`下写入git的提交钩子函数，当用git提交代码时会
做以下验：
* 首先做`pre-commit`校验，校验Eslint是否通过，如果警告或者错误，不允许提交
* 做`commit-msg`校验，校验git提交的文案是否符合要求  
**注: `commit-msg`这个钩子暂无开启**  

# Axios请求
Axios请求通过Vue.plugin引入到Vue原型上，可通过axios的全局拦截器去做统一的处理，包括请求的header、返回结果的错误码处理  
# 日志打印
前端层面用的是Vue插件形式引入的Logger。已植入到Vue原型中，Vue组件中可通过
```javascript
export default {
  mounted() {
    this.log(xxxx)
    this.warm(xxxx)
    this.error(xxx)
    this.trace(xxx)
  }
}
```

# Node层架构
目前使用`Koa2 + Koa-router + webpack相关plugins + proxy`,加入了Nodemon来监听文件并做实时刷新
## 接口的处理
Koa端会拦截到前端发起的http请求，在`server/middlewares/proxy`会做接口的转发。转发代理在`config/index.js`中配置，具体的逻辑见
代码，这里不做赘述。
## 日志打印
Node层用的是[fary-log](https://www.npmjs.com/package/fary-log)

# 目录结构说明

```
├── build                    // 包含webpack，打包等相关信息
│   ├── webpack              // webpack配置文件
│   ├── build.js             // 打包入口
|   ├── vue-loader.conf.js   // vue-loader配置
├── config                   // 统一配置信息
│   ├── index.js             // 配置信息入口，全局统一信息
│   ├── postcss.conf.js      // postcss的配置信息
├── dist                     // 打包后的文件夹
├── githooks                 // 注入本地的git钩子处理函数，在提交时进行校验
├── node_modules             // 依赖
├── server                   // 服务端控制，包含koa启动配等
├── src                      // 业务代码
│   ├── assets               // 样式和图片
│   ├── ......               // vue和业务的一些文件夹
├── .babelrc                 // babel配置文件
├── .eslintignore            // eslint忽略配置
├── .eslintrc.js             // eslint校验规则
├── .gitignore               // git忽略配置
├── index.html               // 单页应用的入口html
├── package.json             // 依赖的配置信息
├── package-lock.json        // 用以记录当前状态下实际安装的各个npm package的具体来源和版本号。
├── nodemon.json             // 监控node文件，实时热更
├── gulpfile.js              // 暂无使用
```

# 技术栈基于但不限于以下
* [Vue全家桶](https://cn.vuejs.org/v2/guide/)
* [Webpack](https://doc.webpack-china.org/concepts/)(包括各种plugin和基于webpack的插件)
* [Koa](http://koajs.com/#application)以及Koa的插件集合（Koa-Router、Koat-Compose、koa-better-http-proxy）
* [Eslint](http://eslint.cn/docs/rules/)
* [Babel](http://babeljs.io/)
* [koa2-connect-history-api-fallback](https://github.com/ishen7/koa2-connect-history-api-fallback#readme)(解决    history下的路由,hash情况下不需要使用)
* [git以及git钩子函数](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
* [stylus](https://www.zhangxinxu.com/jq/stylus/) 和 [less](http://lesscss.cn/)

# todos
优化类：  

[x] webpack升级到4.x  
[ ] 优化依赖和package.json  
[ ] 将脚手架配置打包以NPM包的形式管理  
[ ] 增加git的提交注释校验  
[ ] 优化package里的script命令  
[ ] 集成jest测试  
[ ] 加入webpack.DllPlugin加快构建速度  
  
待定：  
[ ] 加入typescript
