import axios from 'axios'

const request = axios.create({
  timeout: 10000,
  baseURL: 'http://talkapi.dei2.com/',
  // baseURL: 'http://10.2.5.98:3000/',
  headers: {
    // 'powered': 'Enkel'
  }
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(response => {
  return response
})

export default request