import z from 'zod'
import { DocumentType } from '@/entities/document/types'

export const BaseDocumentSchema = z.object({
  id: z.string().optional(), // optional for creation
  userId: z.string().optional(), // usually set server-side
  documentType: z.nativeEnum(DocumentType),
  validFrom: z.string(),
  validUntil: z.string()
})
