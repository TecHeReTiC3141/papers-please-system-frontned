import type { VisaDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

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
        { label: t('documents.visa.holderName'), value: document.body.holderName, fieldKey: 'body.holderName' },
        { label: t('documents.visa.nationality'), value: document.body.nationality, fieldKey: 'body.nationality' },
        { label: t('documents.visa.purpose.label'), value: document.body.purpose, fieldKey: 'body.purpose' },
        { label: t('documents.visa.durationDays'), value: document.body.durationDays, fieldKey: 'body.durationDays' },
        { label: t('documents.validFrom'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('documents.validUntil'), value: document.validUntil, fieldKey: 'validUntil' },
        { label: t('documents.visa.visaId'), value: document.body.visaId, fieldKey: 'body.visaId' }
      ]}
    />
  )
}
