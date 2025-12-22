import { useQuery } from '@tanstack/react-query'
import { UserRole, type InspectorExtendedInfo, type User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type { Shift } from '@/entities/shift'
import type { MultipleEntitiesResponse } from '@/shared/api/types'

export function useGetActiveShift() {
  const api = useApi()
  const user = useAuthUser<User>()

  return useQuery({
    queryKey: ['shifts', 'active', user?.id],
    enabled: !!user?.id,

    queryFn: async () => {
      if (!user) return null
      let userId = user.id
      if (user.role !== UserRole.BOSS) {
        const { data: inspectorData } = await api.get<InspectorExtendedInfo>(`/users/${user.id}/details`)
        userId = inspectorData.boss.id
      }
      const { data } = await api.get<MultipleEntitiesResponse<Shift>>(`/shifts?createdBy=${userId}&endTimeNotNull`)
      const activeShift = data.items.find((shift) => !shift.endTime)

      return activeShift ?? null
    }
  })
}
