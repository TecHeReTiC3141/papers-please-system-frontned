import type { WorkPermitDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

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
        { label: t('Worker name'), value: document.body.workerName, fieldKey: 'body.workerName' },
        { label: t('Occupation'), value: document.body.occupation, fieldKey: 'body.occupation' },
        { label: t('Employer'), value: document.body.employer, fieldKey: 'body.employer' },
        { label: t('Issue date'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('Expires at'), value: document.validUntil, fieldKey: 'validUntil' },
        { label: t('Permit ID'), value: document.body.permitId, fieldKey: 'body.permitId' }
      ]}
    />
  )
}
