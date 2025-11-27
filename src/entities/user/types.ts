import type { BaseEntity } from '../common'
import type { Upk } from '../upk/types'

export enum UserRole {
  GOD = 'GOD',
  BOSS = 'BOSS',
  INSPECTOR = 'INSPECTOR',
  SECURITY = 'SECURITY',
  MIGRANT = 'MIGRANT'
}

export interface User extends BaseEntity {
  name: string
  email: string
  passwordHash?: string
  role: UserRole
  upk?: Upk | null
}
