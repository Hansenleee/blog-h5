// 校验后端接口日期格式的正则
const BACKEN_DATE_REG = /^\/Date\((\d+)\+(\d+)\)\//
/**
 * 将 Date 转化为指定格式的String * 月(M)、日(D)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(Q)
 * 可以用 1-2 个占位符 * 年(Y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 增加一种自定义格式化T--本日的展示HH:mm,本年展示MM-DD,其他展示YYYY-MM-DD
 * 默认，不传fmt日期模板时返回：24进制小时：分钟：秒
 * @param {Number} date 日期
 * @param {String} fmt 格式化模板
 * @return {String} 返回格式化日期
 */
export default function formatData(date, fmt = 'YYYY-MM-DD') {
  // 后端接口返回的日期格式/Date(1529995579000+0800)/
  if (BACKEN_DATE_REG.test(date)) {
    const exec = BACKEN_DATE_REG.exec(date)
    const offset = new Date().getTimezoneOffset() / 60
    const dateOffset = parseInt(exec[2], 0) / -100
    date = new Date(parseInt(exec[1], 0) + (offset - dateOffset) * 60 * 60 * 1000)
  } else if (!isNaN(date) && !(date instanceof Date)) {
    // 判断date类型，转换为标准的Date格式
    date = new Date(Number.parseInt(date, 10))
  } else if (/-|\//g.test(date)) {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (!date) return ''
  let k
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  const week = {
    0: '/u65e5', // 日
    1: '/u4e00', // 一
    2: '/u4e8c', // 二
    3: '/u4e09', // 三
    4: '/u56db', // 四
    5: '/u4e94', // 五
    6: '/u516d', // 六
  }
  // 匹配年份
  if (/(Y+)/.test(fmt)) {
    // eslint-disable-next-line
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 匹配周
  if (/(E+)/.test(fmt)) {
    const length = RegExp.$1.length
    const eString = length > 2 ? '/u661f/u671f' : '/u5468'
    fmt = fmt.replace(RegExp.$1, (length > 1 ? eString : '') + week[date.getDay()])
  }
  // 匹配日期，但匹配到一个时，返回对应的值，匹配超过一个返回1位数前缀加0，2位数保持不变
  for (k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // eslint-disable-next-line
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
