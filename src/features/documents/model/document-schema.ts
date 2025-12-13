import z from 'zod'
import { CertificateSchema } from './certificate-document'
import { PassportSchema } from './passport-schema'
import { PhotoSchema } from './photo-document-schema'
import { VisaSchema } from './visa-schema'
import { WorkPermitSchema } from './work-permit-schema'

export const DocumentSchema = z.discriminatedUnion('type', [
  PassportSchema,
  VisaSchema,
  CertificateSchema,
  WorkPermitSchema,
  PhotoSchema
])
