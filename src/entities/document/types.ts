export type Document<TBody> = {
  id?: string
  userId: string
  documentType: DocumentType
  body: TBody
  validFrom: string // ISO
  validUntil: string // ISO
}

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
// ---------------------------
// Body definitions
// ---------------------------

export type PassportBody = {
  fullName: string
  country: string
  dateOfBirth: string
  sex: 'M' | 'F'
  issuingRegion: string
  passportNumber: string
}

export type VisaBody = {
  holderName: string
  nationality: string
  purpose: 'work' | 'visit' | 'transit'
  durationDays: number
  visaId: string
}

export type CertificateBody = {
  certificateType: string
  holderName: string
  additionalInfo?: string
}

export type WorkPermitBody = {
  workerName: string
  occupation: string
  employer: string
  permitId: string
}

export type PhotoBody = {
  ownerName: string
  imageUrl: string
  resolution: string
}

export type PassportDocument = Document<PassportBody> & {
  documentType: DocumentType.PASSPORT
}

export type VisaDocument = Document<VisaBody> & {
  documentType: DocumentType.VISA
}

export type CertificateDocument = Document<CertificateBody> & {
  documentType: DocumentType.CERTIFICATE
}

export type WorkPermitDocument = Document<WorkPermitBody> & {
  documentType: DocumentType.WORK_PERMIT
}

export type PhotoDocument = Document<PhotoBody> & {
  documentType: DocumentType.PHOTO
}

export type BlankDocument = {
  id: ''
  documentType: ''
  validFrom: ''
  validUntil: ''
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
