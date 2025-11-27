import type { User, UserRole } from '@entities/user/types'

export type AuthResponse = {
  token: string
  user: User
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
  role: UserRole
  upkId?: string
}
