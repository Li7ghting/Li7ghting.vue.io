/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}
/**
 * 判断是否 动态路由
 */
export function isDynamicRoutes(s) {
  return /isDynamicRoutes/.test(s)
}
