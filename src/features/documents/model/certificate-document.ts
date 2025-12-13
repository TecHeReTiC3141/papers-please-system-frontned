import { DocumentType } from '@/entities/document/types'
import { dateValidator } from '@/shared/validation'
import z from 'zod'

export const CertificateSchema = z.object({
  type: z.literal(DocumentType.CERTIFICATE),

  certificateType: z.string().min(1, 'Required'), // "medical", "vaccination", etc.
  holderName: z.string().min(1, 'Required'),
  issuedBy: z.string().min(1, 'Required'),
  issueDate: dateValidator,

  additionalInfo: z.string().optional()
})
