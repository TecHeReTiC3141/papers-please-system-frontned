import {
  DocumentType,
  type AnyDocument,
  type CertificateDocument,
  type PassportDocument,
  type PhotoDocument,
  type VisaDocument,
  type WorkPermitDocument
} from '@/entities/document/types'

export function getInitialValuesByType(type: DocumentType): AnyDocument {
  switch (type) {
    case DocumentType.PASSPORT:
      return {
        type,
        fullName: '',
        country: '',
        dateOfBirth: '',
        sex: 'M',
        issuingRegion: '',
        expiresAt: '',
        passportNumber: ''
      } satisfies PassportDocument

    case DocumentType.VISA:
      return {
        type,
        holderName: '',
        nationality: '',
        purpose: '',
        durationDays: 0,
        issueDate: '',
        expiresAt: '',
        visaId: ''
      } satisfies VisaDocument

    case DocumentType.CERTIFICATE:
      return {
        type,
        certificateType: '',
        holderName: '',
        issuedBy: '',
        issueDate: '',
        additionalInfo: ''
      } satisfies CertificateDocument

    case DocumentType.WORK_PERMIT:
      return {
        type,
        workerName: '',
        occupation: '',
        employer: '',
        issueDate: '',
        expiresAt: '',
        permitId: ''
      } satisfies WorkPermitDocument

    case DocumentType.PHOTO:
      return {
        type,
        ownerName: '',
        imageUrl: '',
        resolution: '',
        takenAt: ''
      } satisfies PhotoDocument

    default:
      throw new Error('Unsupported document type: ' + type)
  }
}
