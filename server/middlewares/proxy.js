import config from '../../config/index'
import log from 'fary-log'
import koaHttpProxy from 'koa-better-http-proxy'
import compose from  'koa-compose'
import { IS_DEBUG } from '../utils/env'

const logger = log('proxyMiddlerware')

/**
 * 接口代理的中间件
 * @param {Object} options - 配置项
 * @param {Array} options.whiteList - 白名单，不进行代理的接口
 */
module.exports = (options = {}) => {
  // 白名单
  const whiteList = options.whiteList || []

  // proxy做代理前的信息处理
  async function preDealProxyServer(ctx, next) {
    const { env, proxy } = config

    // 查看当前环境是否有配置proxy代理
    if (!proxy[env]) {
      logger.warn('The current env has no proxy!')
      return Promise.resolve()
    } else if (whiteList.indexOf(ctx.url) > -1) {
      // 在白名单里，不代理
      return Promise.resolve()
    } else {
      const proxyEnv = proxy[env]
      // 判断是否为对象形式
      if (typeof proxyEnv !== 'string' && proxyEnv.host) {
        ctx._proxyTarget = proxyEnv.host
        ctx._proxyTarget_paht = proxyEnv.path

        logger.info(`Request '${ctx.url}' will be proxied to '${ctx._proxyTarget + ctx._proxyTarget_paht + ctx.url}'`)
      } else {
        ctx._proxyTarget = proxyEnv

        logger.info(`Request '${ctx.url}' will be proxied to '${ctx._proxyTarget + ctx.url}'`)
      }
    }

    return next()
  }

  return compose([
    preDealProxyServer,
    // 用koa-better-http-proxy做代理
    // https://github.com/nsimmons/koa-better-http-proxy#readme
    koaHttpProxy(
      (ctx) => ctx._proxyTarget,
      {
        // 不解析body，不限制body大小
        parseReqBody: false,
        /**
         * path路径解析
         * @param {ctx} ctx - koa ctx
         * @return {String}
         */
        proxyReqPathResolver(ctx) {
          return ctx._proxyTarget_paht ? ctx._proxyTarget_paht + ctx.url : ctx.url
        },
        /**
         * 代理前回调
         * @param {Object} proxyReqOpts - 代理请求选项
         * @param {ctx} ctx - koa ctx
         * @return {Promise.<*>} *
         */
        proxyReqOptDecorator: function(proxyReqOpts, ctx) {
          // 去掉Referer头，否则可能会造成CSRF问题，影响开发
          if (IS_DEBUG) {
            delete proxyReqOpts.headers.referer
            delete proxyReqOpts.headers.origin
          }
          proxyReqOpts.headers['Content-Type'] = 'application/json; charset=utf-8';
          
          // logger.info(proxyReqOpts)
          return proxyReqOpts;
        },
        /**
         * 代理请求被响应后的回调
         * @param {Response} proxyRes - 代理请求选项
         * @param {Object} proxyResData - 响应数据
         * @param {ctx} ctx - koa ctx
         * @return {Promise.<*>} *
         */
        async userResDecorator(proxyRes, proxyResData, ctx) {
          // logger.info('proxy send after')
          return proxyResData
        },
      }
    )
  ])
}