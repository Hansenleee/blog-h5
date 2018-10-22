/**
 * 路由钩子函数
 */
import router from './router'

// 验证页面的权限
router.beforeEach((to, from, next) => {
  next()
})
