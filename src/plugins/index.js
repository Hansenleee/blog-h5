/**
 * Vue全局插件
 */

import Vue from 'vue'
import VueAxios from './http'
import VueLogger from './log'

Vue.use(VueAxios)
Vue.use(VueLogger)
