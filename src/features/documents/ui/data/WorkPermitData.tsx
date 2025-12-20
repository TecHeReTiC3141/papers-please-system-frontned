import type { WorkPermitDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

type Props = {
  document: WorkPermitDocument
  inspectorMode?: boolean
}

export function WorkPermitData({ document, inspectorMode = false }: Props) {
  const { t } = useTranslation()
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: t('documents.workPermit.workerName'), value: document.body.workerName, fieldKey: 'body.workerName' },
        { label: t('documents.workPermit.occupation'), value: document.body.occupation, fieldKey: 'body.occupation' },
        { label: t('documents.workPermit.employer'), value: document.body.employer, fieldKey: 'body.employer' },
        { label: t('documents.validFrom'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('documents.validUntil'), value: document.validUntil, fieldKey: 'validUntil' },
        { label: t('documents.workPermit.permitId'), value: document.body.permitId, fieldKey: 'body.permitId' }
      ]}
    />
  )
}
