import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type { User } from '@/entities/user'
import type { Shift } from '@/entities/shift'
import type { ShiftEmployee } from '@/entities/user'
import { useNavigate } from 'react-router'

export function useOpenShiftMutation() {
  const navigate = useNavigate()
  const api = useApi()
  const queryClient = useQueryClient()
  const user = useAuthUser<User | null>()

  return useMutation({
    mutationFn: async (employees: ShiftEmployee[]) => {
      if (!user) throw new Error('User not authenticated')

      const shiftBody = {
        startTime: new Date().toISOString(),
        upkId: user.upkId
      }

      const { data: shift } = await api.post<Shift>('/shifts', shiftBody)

      await Promise.all(
        employees.map((employee) =>
          api.post('/participations', {
            shiftId: shift.id,
            userId: employee.id,
            wage: 0,
            penalty: 0,
            specialization: employee.specialization
          })
        )
      )

      navigate('/tickets')

      return shift
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shifts', 'active', user?.id]
      })
    }
  })
}
