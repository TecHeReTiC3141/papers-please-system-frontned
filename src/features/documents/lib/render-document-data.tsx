import { DocumentType, type AnyDocument } from '@/entities/document/types'
import { PassportData, VisaData, CertificateData, WorkPermitData, PhotoData } from '@/features/documents/ui'

export function renderDocumentData(doc: AnyDocument, inspectorMode: boolean) {
  switch (doc.documentType) {
    case DocumentType.PASSPORT:
      return <PassportData document={doc} inspectorMode={inspectorMode} />

    case DocumentType.VISA:
      return <VisaData document={doc} inspectorMode={inspectorMode} />

    case DocumentType.CERTIFICATE:
      return <CertificateData document={doc} inspectorMode={inspectorMode} />

    case DocumentType.WORK_PERMIT:
      return <WorkPermitData document={doc} inspectorMode={inspectorMode} />

    case DocumentType.PHOTO:
      return <PhotoData document={doc} inspectorMode={inspectorMode} />

    default:
      return null
  }
}
