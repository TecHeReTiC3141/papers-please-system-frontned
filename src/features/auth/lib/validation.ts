import { z } from 'zod'
import { UserRole } from '@entities/user/types'

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(1, 'Пароль обязателен')
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Имя должно быть не менее 2 символов').max(100, 'Имя слишком длинное'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole),
    upkId: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  })
