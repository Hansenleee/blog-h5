import axios from 'axios'
import { IS_DEBUG } from 'src/utils/env'

axios.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line
    const apiPathname = IS_DEBUG ? 'localhost:3000' : '120.55.171.184:3000'
    config.url = `http://${apiPathname}/api/pc${config.url}`
    config.withCredentials = true
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => {
    const { data } = response
    const code = String(data.code)

    switch (code) {
      case '0':
        return data
      case '-2':
        // 需要登录
        return '-2'
      default:
        return Promise.reject(data)
    }
  },
  (error) => {
    if (error.response && error.response.status >= 500) {
    }
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error)
  },
)

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios
