export enum DocumentType {
  PASSPORT = 'PASSPORT',
  VISA = 'VISA',
  CERTIFICATE = 'CERTIFICATE',
  WORK_PERMIT = 'WORK_PERMIT',
  PHOTO = 'PHOTO'
}

// ---------------------------
// Document Type Definitions
// ---------------------------

export type PassportDocument = {
  type: DocumentType.PASSPORT
  fullName: string
  country: string
  dateOfBirth: string
  sex: string
  issuingRegion: string
  expiresAt: string
  passportNumber: string
}

export type VisaDocument = {
  type: DocumentType.VISA
  holderName: string
  nationality: string
  purpose: string // "work" | "visit" | "transit"
  durationDays: number
  issueDate: string
  expiresAt: string
  visaId: string
}

export type CertificateDocument = {
  type: DocumentType.CERTIFICATE
  certificateType: string // "medical", "vaccination", etc.
  holderName: string
  issuedBy: string
  issueDate: string
  additionalInfo?: string
}

export type WorkPermitDocument = {
  type: DocumentType.WORK_PERMIT
  workerName: string
  occupation: string
  employer: string
  issueDate: string
  expiresAt: string
  permitId: string
}

export type PhotoDocument = {
  type: DocumentType.PHOTO
  ownerName: string
  imageUrl: string // or Blob
  resolution: string // "600x800"
  takenAt: string
}

export type BlankDocument = {
  type: ''
}

// Optional combined type
export type AnyDocument = (
  | PassportDocument
  | VisaDocument
  | CertificateDocument
  | WorkPermitDocument
  | PhotoDocument
  | BlankDocument
) & { attachToProfile: boolean }
