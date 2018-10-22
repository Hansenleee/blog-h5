module.exports = {
  dev: {
    port: 8050,
  },
  // ESLint中验证JSDoc的级别（0：关闭, 1：警告, 2：错误）
  jsdocLevel: 1,
  // 配置信息-针对移动端
  enablePx2Rem: true,
  // 环境配置
  env: 'test',
  // 接口代理 
  proxy: {
    test: 'http://120.55.171.184:3000',
  },
}
