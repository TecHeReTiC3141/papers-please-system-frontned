import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from '@/shared/api/axios'

export const useCloseShiftMutation = () => {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (shiftId: string) => {
      const { data } = await api.patch(`/shifts/${shiftId}`, {
        endTime: new Date().toISOString()
      })
      // TODO: update participations
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift'] })
      queryClient.invalidateQueries({ queryKey: ['shifts', 'active'] })
      queryClient.invalidateQueries({ queryKey: ['shift', 'close'] })
    }
  })
}
