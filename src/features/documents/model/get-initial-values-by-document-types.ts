import {
  DocumentType,
  type AnyDocument,
  type PassportDocument,
  type VisaDocument,
  type CertificateDocument,
  type WorkPermitDocument,
  type PhotoDocument
} from '@/entities/document/types'

export function getInitialValuesByType(type: DocumentType): AnyDocument {
  const common = {
    userId: '',
    validFrom: '',
    validUntil: '',
    attachToProfile: true
  }

  switch (type) {
    case DocumentType.PASSPORT:
      return {
        ...common,
        documentType: DocumentType.PASSPORT,
        body: {
          fullName: '',
          country: '',
          dateOfBirth: '',
          sex: 'M',
          issuingRegion: '',
          passportNumber: ''
        }
      } satisfies PassportDocument

    case DocumentType.VISA:
      return {
        ...common,
        documentType: DocumentType.VISA,
        body: {
          holderName: '',
          nationality: '',
          purpose: 'visit',
          durationDays: 0,
          visaId: ''
        }
      } satisfies VisaDocument

    case DocumentType.CERTIFICATE:
      return {
        ...common,
        documentType: DocumentType.CERTIFICATE,
        body: {
          certificateType: '',
          holderName: '',
          additionalInfo: ''
        }
      } satisfies CertificateDocument

    case DocumentType.WORK_PERMIT:
      return {
        ...common,
        documentType: DocumentType.WORK_PERMIT,
        body: {
          workerName: '',
          occupation: '',
          employer: '',
          permitId: ''
        }
      } satisfies WorkPermitDocument

    case DocumentType.PHOTO:
      return {
        ...common,
        documentType: DocumentType.PHOTO,
        body: {
          ownerName: '',
          imageUrl: '',
          resolution: ''
        }
      } satisfies PhotoDocument

    default:
      throw new Error('Unsupported document type: ' + type)
  }
}
