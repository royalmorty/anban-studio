import api from '@/utils/api'
import { useAuthStore } from '@/stores/auth-store'

// 登录请求参数类型
export interface LoginParams {
  username: string
  password: string
}

// 登录响应类型
export interface LoginResponse {
  token: string;
  expire: number;

  // token: string
  // user: {
  //   id: string
  //   username: string
  //   email?: string
  //   firstName?: string
  //   lastName?: string
  //   role?: string
  // }
  // expiresAt: string
}

/**
 * 认证服务 - 封装所有认证相关的API调用
 */
export const authService = {
  /**
   * 用户登录
   * @param credentials 用户登录凭据
   * @returns 登录响应数据
   */
  login: async (credentials: LoginParams): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/access/token', credentials)

    // 保存认证信息到store
    const { token } = response.data
    useAuthStore.getState().auth.setAccessToken(token)

    return response.data
  },

  // /**
  //  * 用户注册
  //  * @param userData 用户注册信息
  //  * @returns 注册响应数据
  //  */
  // register: async (userData: {
  //   username: string
  //   password: string
  //   email: string
  //   firstName?: string
  //   lastName?: string
  // }): Promise<LoginResponse> => {
  //   const response = await api.post<LoginResponse>('/auth/sign-up', userData)

  //   // 保存认证信息到store
  //   const { token, user, expiresAt } = response.data
  //   useAuthStore.getState().auth.login(token, user, new Date(expiresAt))

  //   return response.data
  // },

  // /**
  //  * 忘记密码请求
  //  * @param email 用户邮箱
  //  */
  // forgotPassword: async (email: string): Promise<void> => {
  //   await api.post('/auth/forgot-password', { email })
  // },

  // /**
  //  * 重置密码
  //  * @param token 重置密码令牌
  //  * @param newPassword 新密码
  //  */
  // resetPassword: async (token: string, newPassword: string): Promise<void> => {
  //   await api.post('/auth/reset-password', { token, newPassword })
  // },

  // /**
  //  * 获取当前用户信息
  //  * @returns 用户信息
  //  */
  // getCurrentUser: async (): Promise<LoginResponse['user']> => {
  //   const response = await api.get('/auth/me')
  //   return response.data
  // },

  // /**
  //  * 用户登出
  //  */
  // logout: async (): Promise<void> => {
  //   try {
  //     await api.post('/auth/logout')
  //   } catch (error) {
  //     // 即使登出请求失败，也清除本地认证信息
  //     console.error('Logout API request failed:', error)
  //   } finally {
  //     // 清除认证信息
  //     useAuthStore.getState().auth.reset()
  //   }
  // },
}