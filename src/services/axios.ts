import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { handleServerError } from '@/utils/handle-server-error'


// 创建axios实例
const client = axios.create({
  // 设置基础URL，可从环境变量中读取
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  // 设置请求头
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加认证token等
client.interceptors.request.use(
  (config) => {
    // 从auth store获取token
    const token = useAuthStore.getState().auth.accessToken

    // 如果有token，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理响应和错误
client.interceptors.response.use(
  (response) => {
    // 可以在这里对响应数据进行统一处理

    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText));
    }

    if (response.data.code !== 0) {
      return Promise.reject(response.data.msg);
    }

    return response.data;
  },
  (error) => {
    // 统一错误处理
    handleServerError(error)

    return Promise.reject(error)
  }
)

export default client