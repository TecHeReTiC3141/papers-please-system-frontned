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
        { label: t('Owner'), value: document.body.ownerName, fieldKey: 'body.ownerName' },
        { label: t('Resolution'), value: document.body.resolution, fieldKey: 'body.resolution' },
        {
          label: t('Photo'),
          value: (
            <img src={document.body.imageUrl} alt="Document photo" className="w-24 rounded-md border border-base-300" />
          ),
          fieldKey: 'body.imageUrl'
        },
        { label: t('Issue date'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('Expires at'), value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
