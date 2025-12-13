import { DocumentType } from '@/entities/document/types'
import z from 'zod'
import { BaseDocumentSchema } from './base-document-schema'

export const WorkPermitBodySchema = z.object({
  workerName: z.string().min(1, 'Required'),
  occupation: z.string().min(1, 'Required'),
  employer: z.string().min(1, 'Required'),
  permitId: z.string().min(1, 'Required')
})

export const WorkPermitDocumentSchema = BaseDocumentSchema.extend({
  documentType: z.literal(DocumentType.WORK_PERMIT),
  body: WorkPermitBodySchema
})
