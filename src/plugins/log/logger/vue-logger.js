/**
 * vue日志打印器
 */

import Logger from './logger'

/**
 * Vue日志打印类，打印出vue实例的目标组件名称和路由名称
 * @class
 */
export default class VueLogger {
  /**
   * 构造函数
   * @param {string} namespace - 命名空间
   */
  constructor(namespace) {
    const logger = new Logger(namespace)

    const loggerList = ['log', 'warn', 'error', 'trace']

    loggerList.forEach((logType) => {
      this[logType] = (vm, ...args) => {
        // 不存在vue实例时，简单打印
        if (!vm) {
          return
        }

        if (vm._isVue !== true) {
          // eslint-disable-next-line
          logger[logType].call(logger, vm, ...args)
          return
        }

        // 定义组件当前位置
        const parentVnode = vm.$options._parentVnode
        const filename = parentVnode ? parentVnode.componentOptions.Ctor.options.__file : ''
        const index = filename.lastIndexOf('/')
        const componentName = filename.slice(index + 1, -4) || '(unkonwn component name)'

        const routeName = (vm.$route || {}).name || '(unkonwn route name)'
        // eslint-disable-next-line
        logger[logType].call(logger, ...args, `@${componentName.toString()}`, `#${routeName.toString()}`)
      }
    })
  }

  /**
   * 更改全局配置参数
   * @param {object} [options={}] - 配置参数
   */
  static config(options = {}) {
    Logger.config(options)
  }
}
