import Mock from 'mockjs'
import * as login from './modules/login'
import * as menu from './modules/menu'

// 通过isOpen 参数设置是否拦截mock功能
fnCreate(login, true)
fnCreate(menu, true)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启？
 */
function fnCreate(mod, isOpen = true) {
  if (isOpen) {
    for (var key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          Mock.mock(new RegExp(res.url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock 拦截， 请求：', 'color:blue', opts)
            console.log('%cmock拦截，响应：', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}
