import type { VisaDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: VisaDocument
  inspectorMode?: boolean
}

export function VisaData({ document, inspectorMode = false }: Props) {
  const { t } = useTranslation()
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: t('Holder name'), value: document.body.holderName, fieldKey: 'body.holderName' },
        { label: t('Nationality'), value: document.body.nationality, fieldKey: 'body.nationality' },
        { label: t('Purpose'), value: document.body.purpose, fieldKey: 'body.purpose' },
        { label: t('Duration (days)'), value: document.body.durationDays, fieldKey: 'body.durationDays' },
        { label: t('Issue date'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('Expires at'), value: document.validUntil, fieldKey: 'validUntil' },
        { label: t('Visa ID'), value: document.body.visaId, fieldKey: 'body.visaId' }
      ]}
    />
  )
}
