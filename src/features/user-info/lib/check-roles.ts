import {
  UserRole,
  type BossExtendedInfo,
  type InspectorExtendedInfo,
  type MigrantExtendedInfo,
  type UserExtendedInfo
} from '@/entities/user'

const INSPECTOR_ROLES = [UserRole.INSPECTOR, UserRole.SECURITY]

export const checkIfInspectorInfo = (userInfo: UserExtendedInfo): userInfo is InspectorExtendedInfo =>
  INSPECTOR_ROLES.includes(userInfo.role)

export const checkIfBossInfo = (userInfo: UserExtendedInfo): userInfo is BossExtendedInfo =>
  userInfo.role === UserRole.BOSS

export const checkIfMigrantInfo = (userInfo: UserExtendedInfo): userInfo is MigrantExtendedInfo =>
  userInfo.role === UserRole.MIGRANT
