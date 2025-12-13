import { DocumentType } from '@/entities/document/types'
import { z } from 'zod'
import { BaseDocumentSchema } from './base-document-schema'

export const VisaBodySchema = z.object({
  holderName: z.string().min(1, 'Required'),
  nationality: z.string().min(1, 'Required'),
  purpose: z.enum(['work', 'visit', 'transit']),
  durationDays: z.number().int().positive('Must be > 0'),
  visaId: z.string().min(1, 'Required')
})

export const VisaDocumentSchema = BaseDocumentSchema.extend({
  documentType: z.literal(DocumentType.VISA),
  body: VisaBodySchema
})
