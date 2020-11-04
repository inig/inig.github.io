import axios from 'axios'

const request = axios.create({
  timeout: 60000,
  // baseURL: 'http://talkapi.dei2.com/',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL: 'http://127.0.0.1:3000/',
  // baseURL: 'http://10.2.5.98:3000/',
})

request.interceptors.request.use((config) => {
  console.log('==========', config)
  return config
})

request.interceptors.response.use((response) => {
  console.log('Response: ', response)
  return response
})

export default request
