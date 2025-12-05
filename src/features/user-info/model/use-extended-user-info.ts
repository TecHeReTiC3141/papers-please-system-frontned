import {
  type BossExtendedInfo,
  UserRole,
  type InspectorExtendedInfo,
  type User,
  type UserExtendedInfo
} from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export const useExtendedUserInfo = () => {
  const api = useApi()
  const userData = useAuthUser<User>()

  return async (): Promise<UserExtendedInfo | null> => {
    if (!userData) return null

    if (userData.role === UserRole.BOSS) {
      const { data } = await api.get<BossExtendedInfo>(`/users/${userData.id}/boss-details`)

      return data
    }
    if (userData.role === UserRole.INSPECTOR || userData.role == UserRole.SECURITY) {
      const { data } = await api.get<InspectorExtendedInfo>(`/users/${userData.id}/details`)

      return data
    }

    return userData
  }
}
