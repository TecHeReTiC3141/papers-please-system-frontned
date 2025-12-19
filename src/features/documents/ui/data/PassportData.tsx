import type { PassportDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

type Props = {
  document: PassportDocument
  inspectorMode?: boolean
}

export function PassportData({ document, inspectorMode = false }: Props) {
  const { t } = useTranslation()

  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: t('Name'), value: document.body.fullName, fieldKey: 'body.fullName' },
        { label: t('Country'), value: document.body.country, fieldKey: 'body.country' },
        { label: t('Date of birth'), value: document.body.dateOfBirth, fieldKey: 'body.dateOfBirth' },
        { label: t('Sex'), value: document.body.sex === 'M' ? 'Male' : 'Female', fieldKey: 'body.sex' },
        { label: t('Region'), value: document.body.issuingRegion, fieldKey: 'body.issuingRegion' },
        { label: t('Issue date'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('Expires at'), value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
