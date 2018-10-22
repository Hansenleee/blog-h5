/**
 * 日志打印
 */

import { IS_DEBUG } from 'src/utils/env'

// 所有日志打印器的命名空间

const logMap = {
  trace: 'color: lightseagreen',
  log: 'color: lightseagreen',
  warn: 'color: goldenrod',
  error: 'color: red',
}

/**
 * 日志打印类
 * @class Logger
 */
// eslint-disable-next-line
export default class Logger {
  /**
   * 构造函数器
   * @constructor
   * @param {string} namespace - 命名空间
   */
  constructor(namespace) {
    this.namespace = namespace
  }

  // 日志打印命名空间启用输出开关，默认命名空间自动输出日志，设置为false时，可以关才输出
  static options = {
    // global: false
  }

  /**
   * 更改全局配置参数
   * @param {object} [options={}] - 配置参数
   */
  static config(options = {}) {
    Object.assign(Logger.options, options)
  }
}

// 增加到原型上
Object.entries(logMap).forEach(([method, color]) => {
  Logger.prototype[method] = function (...args) {
    // 如果不是开发模式，或者明确定指该命名空间不开启日志打印
    // 则打印方法设置为空函数
    if (!IS_DEBUG || Logger.options[this.namespace] === false) {
      return
    }

    const exp = `%c[${this.namespace}]:`
    args.unshift(exp, color)
    /* eslint-disable no-console */
    console[method](...args)
    /* eslint-enable */
  }
})
