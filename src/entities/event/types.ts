import type { BaseEntity } from '../common'
import type { Priority } from '../ticket'
import type { Specialization } from '../user'

export type Event = BaseEntity & {
  time: string

  description: string

  specialization: Specialization | null

  priority: Priority | null
}
