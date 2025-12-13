import { DocumentType, type AnyDocument } from '@/entities/document/types'
import { PassportData, VisaData, CertificateData, WorkPermitData, PhotoData } from '@/features/documents/ui'

export function renderDocumentData(doc: AnyDocument) {
  switch (doc.documentType) {
    case DocumentType.PASSPORT:
      return <PassportData document={doc} />

    case DocumentType.VISA:
      return <VisaData document={doc} />

    case DocumentType.CERTIFICATE:
      return <CertificateData document={doc} />

    case DocumentType.WORK_PERMIT:
      return <WorkPermitData document={doc} />

    case DocumentType.PHOTO:
      return <PhotoData document={doc} />

    default:
      return null
  }
}
