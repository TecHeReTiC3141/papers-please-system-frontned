import type { BaseEntity } from '../common'
import type { AnyDocument } from '../document/types'
import type { ShiftBossExtendedInfo, ShiftInspectorExtendedInfo } from '../shift'
import type { Upk } from '../upk/types'

export enum UserRole {
  GOD = 'GOD',
  BOSS = 'BOSS',
  INSPECTOR = 'INSPECTOR',
  SECURITY = 'SECURITY',
  MIGRANT = 'MIGRANT'
}

export enum Specialization {
  PASSPORT = 'passport',
  LOCALS = 'locals',
  WORK = 'work',
  TRANSIT = 'transit',
  SPECIAL = 'special'
}

export type User = BaseEntity & {
  name: string
  email: string
  passwordHash?: string
  role: UserRole
  upkId: string | null
}

export type InspectorExtendedInfo = User & {
  upk: Upk
  boss: User
  shifts: ShiftInspectorExtendedInfo[]
}
export type BossExtendedInfo = User & {
  upk: Upk
  subordinates: User[]
  shifts: ShiftBossExtendedInfo[]
}

export type MigrantExtendedInfo = User & {
  documents: AnyDocument[]
}

export type UserExtendedInfo = User | InspectorExtendedInfo | BossExtendedInfo | MigrantExtendedInfo
