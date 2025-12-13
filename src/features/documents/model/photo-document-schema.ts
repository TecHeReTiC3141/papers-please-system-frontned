import { DocumentType } from '@/entities/document/types'
import { dateValidator } from '@/shared/validation'
import z from 'zod'
import { BaseDocumentSchema } from './base-document-schema'

export const PhotoBodySchema = z.object({
  ownerName: z.string().min(1, 'Required'),
  imageUrl: z.string().url('Must be a valid URL'),
  resolution: z.string().regex(/^\d+x\d+$/, 'Resolution must be in WxH format'),
  takenAt: dateValidator
})

export const PhotoDocumentSchema = BaseDocumentSchema.extend({
  documentType: z.literal(DocumentType.PHOTO),
  body: PhotoBodySchema
})
