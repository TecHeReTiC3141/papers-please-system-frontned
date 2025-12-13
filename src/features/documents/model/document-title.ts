import { DocumentType, type AnyDocument } from '@/entities/document/types'

export const documentTitleMap: Record<AnyDocument['type'], string> = {
  [DocumentType.PASSPORT]: 'Passport',
  [DocumentType.VISA]: 'Visa',
  [DocumentType.CERTIFICATE]: 'Certificate',
  [DocumentType.WORK_PERMIT]: 'Work permit',
  [DocumentType.PHOTO]: 'Photo',
  '': 'Draft'
}
