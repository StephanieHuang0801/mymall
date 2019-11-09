/*
 * @Author: your name
 * @Date: 2019-11-07 21:34:50
 * @LastEditTime: 2019-11-09 21:56:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\plugins\http.js
 */
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$http = axios
}
export default MyHttpServer
