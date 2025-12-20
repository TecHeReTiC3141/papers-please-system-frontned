import type { PhotoDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

type Props = {
  document: PhotoDocument
  inspectorMode?: boolean
}

export function PhotoData({ document, inspectorMode = false }: Props) {
  const { t } = useTranslation()
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: t('documents.photo.ownerName'), value: document.body.ownerName, fieldKey: 'body.ownerName' },
        { label: t('documents.photo.resolution'), value: document.body.resolution, fieldKey: 'body.resolution' },
        {
          label: t('documents.photo.imageUrl'),
          value: (
            <img src={document.body.imageUrl} alt="Document photo" className="w-24 rounded-md border border-base-300" />
          ),
          fieldKey: 'body.imageUrl'
        },
        { label: t('documents.validFrom'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('documents.validUntil'), value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
