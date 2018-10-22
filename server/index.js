require('babel-register')
var Koa = require('koa')
var convert = require('koa-convert')
var webpack = require('webpack')
var webpackDevMiddleware = require('koa-webpack-dev-middleware')
var webpackHotMiddleware = require('koa-webpack-hot-middleware')
var webpackDevConfig = require('../build/webpack/webpack.dev.conf')
var config = require('../config')
var opn = require('opn')
var fs = require('fs')
var os = require('os')
var routes = require('./router/index.js')
var proxyMiddleware = require('./middlewares/proxy')

var compiler = webpack(webpackDevConfig)
var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
})
var koaWebpackDevMiddleware = convert(devMiddleware)
var koaWebpackHotMiddleware = convert(webpackHotMiddleware(compiler))

var app = new Koa()

// 解决history路由模式
app.use(require('koa2-connect-history-api-fallback')({
  // 这里的路由不会进行重定向到index.html。这个路由要走接口请求代理到后端。
  whiteList: ['/Merchant/ThirdPartyLogin']
}))

app.use(koaWebpackDevMiddleware)
app.use(koaWebpackHotMiddleware)

// 路由
app.use(routes.routes())

// 开启server做接口代理
app.use(proxyMiddleware({
  whiteList: ['/favicon.ico']
}))

// 端口
var port = config.dev.port

// 错误日志
app.on('error', (err) => {
  console.log('Server error: ' + err.stack || '')
})

app.listen(port)

console.log('Server is open at ' + port)

// 打开浏览器
if (/^win/.test(os.platform())) {
  // window下使用opn插件去打开默认浏览器
  opn('http://localhost:' + port)
} else {
  // mac下可以使用AppScript去打开指定浏览器
  const execSync = require('child_process').execSync
  execSync('osascript open "' + 'http://localhost:' + port + '"', {
    cwd: __dirname,
    stdio: 'ignore',
  });
}
