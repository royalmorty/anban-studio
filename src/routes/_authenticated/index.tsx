import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Dashboard } from '@/features/dashboard'
import { useAuthStore } from '@/stores/auth-store'
import { useWorkspaceStore } from '@/stores/workspace'
import { TakeAuthInfo } from '@/services/device/take-auth-info'
import { DEFAULT_DEVICE } from '@/stores/workspace'

// 初始化认证信息的hook
const useInitializeAuthInfo = () => {
  const auth = useAuthStore()
  const store = useWorkspaceStore()

  useEffect(() => {
    // 只有当有token但还没有用户信息时才获取认证信息
    if (auth.auth.accessToken && !auth.auth.user) {
      const initializeAuthInfo = async () => {
        try {
          const res = await TakeAuthInfo({})

          // 更新设备信息
          store.update((state) => {
            const devices = { [DEFAULT_DEVICE.id]: { ...DEFAULT_DEVICE, remarks: res?.company } };
            for (const item of res?.devices || []) {
              devices[item.id] = item
            }

            state.num = res?.num;
            state.devices = { ...devices }
          });

          // 更新用户信息
          auth.auth.setUser({
            name: res?.name,
            last_ip: res?.last_ip,
            company: res?.company
          })
        } catch (error) {
          console.error('获取认证信息失败:', error)
        }
      }

      initializeAuthInfo()
    }
  }, [auth.auth.accessToken, auth.auth.user, auth.auth, store])
}

export const Route = createFileRoute('/_authenticated/')({
  component: () => {
    // 在受保护路由入口初始化认证信息
    useInitializeAuthInfo()
    return <Dashboard />
  },
})
