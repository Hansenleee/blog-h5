import Vue from 'vue'
import App from './pages/app.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
/**
 * 将router更新自动同步至vuex
 * 注意：需要在Vue实例前操作
 */
import { sync } from 'vuex-router-sync'

import './plugins'
import './utils/promise-extend'
import './directives'
import './components'
import './filters'
import './router-hook'
import 'normalize.css'
// 部分通用样式统一加载、避免在.vue中重复引用
import 'assets/style/global.styl'
import 'assets/style/flexible.styl'

// 将router更新自动同步至vuex
sync(store, router)

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: createElement => createElement(App),
})
