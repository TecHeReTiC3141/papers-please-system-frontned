import { DocumentType } from '@/entities/document/types'
import { dateValidator } from '@/shared/validation'
import z from 'zod'

export const WorkPermitSchema = z.object({
  type: z.literal(DocumentType.WORK_PERMIT),

  workerName: z.string().min(1, 'Required'),
  occupation: z.string().min(1, 'Required'),
  employer: z.string().min(1, 'Required'),

  issueDate: dateValidator,
  expiresAt: dateValidator,

  permitId: z.string().min(1, 'Required')
})
