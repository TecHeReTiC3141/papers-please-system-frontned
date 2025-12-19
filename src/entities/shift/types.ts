import type { BaseEntity } from '../common'
import type { Upk } from '../upk/types'
import type { Specialization, User } from '../user'

export type Shift = BaseEntity & {
  startTime: string
  endTime: string
  createdBy: string
  upkId: string
}

export type Participation = BaseEntity & {
  userId: string
  shiftId: string
  wage: number
  penalty: number
  specialization: Specialization
}

export type ExtendedInspectorParticipation = Participation & {
  resolvedTickets: number
  passedCrossChecks: number
}

export type ShiftInspectorExtendedInfo = Shift & {
  boss: User
  upk: Upk
  participation: ExtendedInspectorParticipation
}

export type ShiftBossExtendedInfo = Shift & {
  boss: User
  upk: Upk
  totalResolvedTickets: number
  totalCrossChecks: number
}

export type ShiftExtendedInfo = Shift & {
  upk: Upk
  boss: User
  inspectors: ExtendedInspectorParticipation[]
}
