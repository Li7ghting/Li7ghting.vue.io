import Cookies from 'js-cookie'; // 引入token
const TokenKey = 'Admin-Token'; // 设置token存储的key
// 获取token
export function getToken() {
  return Cookies.get(TokenKey);
}

//设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
//移除token
export function removeToken() {
  return Cookies.remove(TokenKey);
}
