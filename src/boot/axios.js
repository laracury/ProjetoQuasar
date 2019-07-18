import axios from 'axios'

var axiosInstance = axios.create({
  baseURL: 'https://stormy-springs-97309.herokuapp.com'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axiosInstance }
