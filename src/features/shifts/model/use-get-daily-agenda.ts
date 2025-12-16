import type { Event } from '@/entities/event/types'
import { Priority } from '@/entities/ticket'
import { Specialization } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const mockEvents: Event[] = [
  {
    id: '1',
    time: '2025-03-05T09:00:00Z',
    description: 'Passport document verification',
    specialization: Specialization.PASSPORT,
    priority: Priority.HIGH
  },
  {
    id: '2',
    time: '2025-03-05T10:30:00Z',
    description: 'Work permit review',
    specialization: Specialization.WORK,
    priority: Priority.NORMAL
  },
  {
    id: '3',
    time: '2025-03-05T12:00:00Z',
    description: 'Local citizen application processing',
    specialization: Specialization.LOCALS,
    priority: Priority.LOW
  },
  {
    id: '4',
    time: '2025-03-05T14:00:00Z',
    description: 'Transit visa inspection',
    specialization: Specialization.TRANSIT,
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
