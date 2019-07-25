import axios from 'axios'
import { SessionStorage } from 'quasar'

var axiosInstance = axios.create({
  baseURL: 'https://stormy-springs-97309.herokuapp.com'
})

axiosInstance.interceptors.request.use(function (config) {
  if (!SessionStorage.getItem('token')) {
    config.headers.authorization = ''
  } else {
    config.headers.authorization = SessionStorage.getItem('token').token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axiosInstance }
