import type { Event } from '@/entities/event/types'
import { Priority } from '@/entities/ticket'
import { Specialization } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const mockEvents: Event[] = [
  {
    id: '1',
    time: '2025-03-05T09:00:00Z',
    description: 'Passport document verification',
    specialization: null,
    priority: Priority.HIGH
  },
  {
    id: '2',
    time: '2025-03-05T10:30:00Z',
    description: 'Work permit review',
    specialization: null,
    priority: Priority.NORMAL
  },
  {
    id: '3',
    time: '2025-03-05T12:00:00Z',
    description: 'Local citizen application processing',
    specialization: null,
    priority: Priority.LOW
  },
  {
    id: '4',
    time: '2025-03-05T14:00:00Z',
    description: 'Transit visa inspection',
    specialization: null,
    priority: Priority.CRITICAL
  }
]

export function useGetDailyAgenda() {
  return useQuery({
    queryKey: ['daily-agenda'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400)) // mock delay
      return mockEvents
    }
  })
}
