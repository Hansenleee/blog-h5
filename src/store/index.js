import Vue from 'vue'
import Vuex from 'vuex'
import { IS_DEBUG } from 'src/utils/env'
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: IS_DEBUG,
  modules: {
    app,
  },
})

export default store
