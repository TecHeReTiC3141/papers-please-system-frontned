import { DocumentType } from '@/entities/document/types'
import z from 'zod'
import { BaseDocumentSchema } from './base-document-schema'

export const CertificateBodySchema = z.object({
  certificateType: z.string().min(1, 'Required'),
  holderName: z.string().min(1, 'Required'),
  issuedBy: z.string().min(1, 'Required'),
  additionalInfo: z.string().optional()
})

export const CertificateDocumentSchema = BaseDocumentSchema.extend({
  documentType: z.literal(DocumentType.CERTIFICATE),
  body: CertificateBodySchema
})
