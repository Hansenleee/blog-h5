/**
 * app 全局模块
 */

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: Object.assign({}, state),
  getters,
  mutations,
  actions,
}
