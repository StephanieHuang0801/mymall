/*
 * @Author: your name
 * @Date: 2019-11-07 21:34:50
 * @LastEditTime: 2019-11-17 21:07:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue.jsc:\编程\vuepro\mymall\src\plugins\http.js
 */
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log('拦截器')
    // console.log(config)
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers.common['Authorization'] = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  // 添加响应拦截器
  // axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //   return response;
  // }, function (error) {
  // 对响应错误做点什么
  //   return Promise.reject(error);
  // });
  Vue.prototype.$http = axios
}
export default MyHttpServer
