/**
 * 全局日志打印器
 */

import Logger from './logger'
const logger = new Logger('global')

const loggerMap = {
  log: logger.log,
  warn: logger.warn,
  error: logger.error,
  trace: logger.trace,
}

Object.keys(loggerMap).forEach((logType) => {
  global[logType] = (...args) => {
    loggerMap[logType].call(logger, ...args)
  }
})
