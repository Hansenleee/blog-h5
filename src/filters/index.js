/**
 * Vue全局过滤器
 */

import Vue from 'vue'
import common from './common'
import dateFilter from './date'

Object.keys(common).forEach((key) => Vue.filter(key, common[key]))
Vue.filter('date', dateFilter)
