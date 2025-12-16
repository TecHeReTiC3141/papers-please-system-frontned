import { useQuery } from '@tanstack/react-query'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useApi } from '@/shared/api/axios'
import { UserRole, type BossExtendedInfo, type User } from '@/entities/user'

export const useGetBossEmployees = () => {
  const api = useApi()
  const userData = useAuthUser<User | null>()

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['boss', 'employees', userData?.id],
    enabled: !!userData && userData.role === UserRole.BOSS,
    queryFn: async () => {
      if (!userData || userData.role !== UserRole.BOSS) {
        return []
      }

      const { data } = await api.get<BossExtendedInfo>(`/users/${userData.id}/boss-details`)

      // subordinates come from boss-details
      return data.subordinates
    }
  })
}
