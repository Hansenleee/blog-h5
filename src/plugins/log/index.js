/**
 * 为vue实例log方法
 * Vue.use(log)
 */
import logger from './logger'

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   * @param {Object} options - options
   */
  install(Vue, options) {
    logger.install(Vue, options)
  },
}
