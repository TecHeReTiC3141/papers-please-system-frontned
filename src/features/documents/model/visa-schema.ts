import { DocumentType } from '@/entities/document/types'
import { dateValidator } from '@/shared/validation'
import { z } from 'zod'

export const VisaSchema = z.object({
  type: z.literal(DocumentType.VISA),

  holderName: z.string().min(1, 'Required'),
  nationality: z.string().min(1, 'Required'),

  purpose: z.enum(['work', 'visit', 'transit']),

  durationDays: z
    .number({
      error: 'Duration must be a number'
    })
    .int()
    .positive('Must be > 0'),

  issueDate: dateValidator,
  expiresAt: dateValidator,

  visaId: z.string().min(1, 'Required')
})
