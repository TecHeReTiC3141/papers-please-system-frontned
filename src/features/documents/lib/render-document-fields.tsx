import { DocumentType, type AnyDocument } from '@/entities/document/types'
import { PassportFields, VisaFields, CertificateFields, WorkPermitFields, PhotoFields } from '@/features/documents/ui'

export function renderDocumentFields(doc: AnyDocument) {
  switch (doc.documentType) {
    case DocumentType.PASSPORT:
      return <PassportFields />

    case DocumentType.VISA:
      return <VisaFields />

    case DocumentType.CERTIFICATE:
      return <CertificateFields />

    case DocumentType.WORK_PERMIT:
      return <WorkPermitFields />

    case DocumentType.PHOTO:
      return <PhotoFields />

    default:
      return null
  }
}
