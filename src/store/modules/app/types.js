/**
 * app模块下的store全局变量
 */

const type = {
}

/**
 * 获取变量
 * @param {String} name - 变量名
 * @return {String} value - 值
 */
export default (name) => {
  return type[name]
}
