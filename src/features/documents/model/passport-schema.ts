import { DocumentType } from '@/entities/document/types'
import { Region } from '@/entities/upk'
import { dateValidator } from '@/shared/validation'
import { z } from 'zod'
import { BaseDocumentSchema } from './base-document-schema'

export const PassportBodySchema = z.object({
  fullName: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  dateOfBirth: dateValidator,
  sex: z.enum(['M', 'F']),
  issuingRegion: z.nativeEnum(Region),
  passportNumber: z.string().min(1, 'Required')
})

export const PassportDocumentSchema = BaseDocumentSchema.extend({
  documentType: z.literal(DocumentType.PASSPORT),
  body: PassportBodySchema
})
