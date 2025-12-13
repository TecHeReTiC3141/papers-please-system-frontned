import { DocumentType } from '@/entities/document/types'
import { dateValidator } from '@/shared/validation'
import z from 'zod'

export const PhotoSchema = z.object({
  type: z.literal(DocumentType.PHOTO),

  ownerName: z.string().min(1, 'Required'),

  imageUrl: z.string().url('Must be a valid URL'), // or `.string().min(1)` if Blob

  resolution: z.string().regex(/^\d+x\d+$/, 'Resolution must be in WxH format (e.g., 600x800)'),

  takenAt: dateValidator
})
