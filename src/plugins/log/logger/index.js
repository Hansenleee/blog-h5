/**
 * vue实例日志打印器
 *
 * 模块性质：vue 原型扩展 插件
 * 作用范围：pc、mobile
 * 依赖模块：vue，plugins/vue-logger
 *
 * ## 特性
 * - 在vue原型上增加了四个实例方法，使用this.log()/this.warn()/this.error()/this.trace()
 * - 该打印器的全局命名空间为component，同时还会打印出当前的打印的组件和路由
 * - 可以通过Vue.use的第二个参数，或Vue.config.loggerToken的配置项，扩展开发者个人专属标识的日志打印器
 *
 * import Vue from 'vue'
 * import componentLogger from 'plugins/prototype/component-logger'
 *
 * Vue.config.loggerToken={
 *    'a':'李滨'
 * }
 *
 * Vue.use(componentLogger)
 *
 * new Vue({
 *    created() {
 *      this.log('打印内容')    =>    [component]: 打印内容 @start #order
 *      this.loga('打印内容')    =>    [component]: [李滨] 打印内容 @start #order
 *    }
 * })
 * ```
 */

import VueLogger from './vue-logger'

const logger = new VueLogger('component')

const loggerMap = {
  log: logger.log,
  warn: logger.warn,
  error: logger.error,
  trace: logger.trace,
}

const componentLogger = {}

/**
 * 暴露install钩子，供vue注册
 * @param {Vue} Vue - Vue构造器类
 * @param {object} [options={}] - 开发组员的专属标识，调用方式为this.loga(msg)
 */
componentLogger.install = function (Vue, options = {}) { // 基础打印器
  Object.keys(loggerMap).forEach((key) => {
    Vue.prototype[key] = function (...args) {
      loggerMap[key].call(logger, this, ...args)
    }
  })

  const loggerToken = Object.assign({}, Vue.config.loggerToken, options)
  // 含开发人员打印标识的打印器
  Object.entries(loggerToken).forEach(([logKey, logValue]) => {
    Object.keys(loggerMap).forEach((key) => {
      Vue.prototype[key + logKey] = function (...args) {
        Vue.prototype[key].call(this, `[${logValue}]`, ...args)
      }
    })
  })
}

export default componentLogger
