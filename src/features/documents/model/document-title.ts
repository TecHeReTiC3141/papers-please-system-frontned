import { DocumentType, type AnyDocument } from '@/entities/document/types'

export const documentTitleMap: Record<AnyDocument['documentType'], string> = {
  [DocumentType.PASSPORT]: 'documents.type.passport',
  [DocumentType.VISA]: 'documents.type.visa',
  [DocumentType.CERTIFICATE]: 'documents.type.certificate',
  [DocumentType.WORK_PERMIT]: 'documents.type.workPermit',
  [DocumentType.PHOTO]: 'documents.type.photo',
  '': 'documents.type.draft'
}
