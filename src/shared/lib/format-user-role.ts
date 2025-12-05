import { UserRole } from '@entities/user'

export function formatUserRole(role: UserRole): string {
  switch (role) {
    case UserRole.GOD:
      return 'Суперадмин'

    case UserRole.BOSS:
      return 'Начальник УПК'

    case UserRole.INSPECTOR:
      return 'Инспектор'

    case UserRole.SECURITY:
      return 'Сотрудник безопасности'

    case UserRole.MIGRANT:
      return 'Мигрант'

    default:
      return role
  }
}
