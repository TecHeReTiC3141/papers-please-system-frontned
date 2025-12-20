import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/shared/api/axios'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type { User } from '@/entities/user'
import type { Shift } from '@/entities/shift'
import type { ShiftEmployee } from '@/entities/user'
import { useNavigate } from 'react-router'
import type { Event } from '@/entities/event'

type OpenShiftParams = {
  events: Event[]
  employees: ShiftEmployee[]
}

export function useOpenShiftMutation() {
  const navigate = useNavigate()
  const api = useApi()
  const queryClient = useQueryClient()
  const user = useAuthUser<User | null>()

  return useMutation({
    mutationFn: async ({ events, employees }: OpenShiftParams) => {
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

      await Promise.all(
        events.map((event) =>
          api.patch(`/events/${event.id}`, {
            specialization: event.specialization
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
