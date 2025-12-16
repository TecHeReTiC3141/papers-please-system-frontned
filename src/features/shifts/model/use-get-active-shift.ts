import { useQuery } from '@tanstack/react-query'
import type { User } from '@/entities/user'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type { Shift } from '@/entities/shift'

export function useGetActiveShift() {
  const api = useApi()
  const user = useAuthUser<User | null>()

  return useQuery({
    queryKey: ['shifts', 'active', user?.id],
    enabled: !!user?.id,

    queryFn: async () => {
      const stored = localStorage.getItem('activeShift')
      if (stored) {
        try {
          return JSON.parse(stored) as Shift
        } catch {
          localStorage.removeItem('activeShift')
        }
      }
      const { data } = await api.get<Shift[]>('/shifts', {
        params: {
          createdBy: user!.id,
          active: true
        }
      })

      // boss can have only one active shift
      return data[0] ?? null
    }
  })
}
