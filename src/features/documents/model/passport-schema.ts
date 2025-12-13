import { DocumentType } from '@/entities/document/types'
import { Region } from '@/entities/upk'
import { dateValidator } from '@/shared/validation'
import { z } from 'zod'

export const PassportSchema = z.object({
  type: z.literal(DocumentType.PASSPORT),

  fullName: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  dateOfBirth: dateValidator,
  sex: z.enum(['M', 'F']),
  issuingRegion: z.nativeEnum(Region),
  expiresAt: dateValidator
})
