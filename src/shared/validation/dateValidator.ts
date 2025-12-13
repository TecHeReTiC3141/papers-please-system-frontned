import { z } from 'zod'

export const dateValidator = z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
