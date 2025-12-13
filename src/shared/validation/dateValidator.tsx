import { z } from 'zod'

export const dateValidator = z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Date must be in format DD.MM.YYYY')
