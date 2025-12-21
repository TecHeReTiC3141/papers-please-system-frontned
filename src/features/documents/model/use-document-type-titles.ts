import { DocumentType, type AnyDocument } from '@/entities/document/types'
import { useTranslation } from 'react-i18next'

export const useDocumentTypeTitles = (): Record<AnyDocument['documentType'], string> => {
  const { t } = useTranslation()

  return {
    [DocumentType.PASSPORT]: t('documents.type.passport'),
    [DocumentType.VISA]: t('documents.type.visa'),
    [DocumentType.CERTIFICATE]: t('documents.type.certificate'),
    [DocumentType.WORK_PERMIT]: t('documents.type.workPermit'),
    [DocumentType.PHOTO]: t('documents.type.photo'),
    '': t('documents.type.draft')
  }
}
