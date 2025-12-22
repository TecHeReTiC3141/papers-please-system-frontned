import type { Event } from '@/entities/event/types'
import { useApi } from '@/shared/api/axios'
import type { MultipleEntitiesResponse } from '@/shared/api/types'
import type { Specialization } from '@/entities/user'

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function useGetDailyAgenda() {
  const api = useApi()

  return async (specialization?: Specialization) => {
    const { data } = await api.get<MultipleEntitiesResponse<Event>>('/events')

    const now = Date.now()
    const weekFromNow = now - ONE_WEEK_MS

    return data.items.filter((event) => {
      const eventTime = new Date(event.time).getTime()
      return eventTime >= weekFromNow && (!specialization || event.specialization === specialization)
    })
  }
}
