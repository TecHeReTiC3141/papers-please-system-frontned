import z from 'zod'
import { CertificateDocumentSchema } from './certificate-document'
import { PassportDocumentSchema } from './passport-schema'
import { PhotoDocumentSchema } from './photo-document-schema'
import { VisaDocumentSchema } from './visa-schema'
import { WorkPermitDocumentSchema } from './work-permit-schema'

export const DocumentSchema = z.discriminatedUnion('documentType', [
  CertificateDocumentSchema,
  PassportDocumentSchema,
  PhotoDocumentSchema,
  VisaDocumentSchema,
  WorkPermitDocumentSchema
])
