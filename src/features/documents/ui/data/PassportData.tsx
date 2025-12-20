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
        { label: t('documents.passport.name'), value: document.body.fullName, fieldKey: 'body.fullName' },
        { label: t('documents.passport.country'), value: document.body.country, fieldKey: 'body.country' },
        { label: t('documents.passport.dateOfBirth'), value: document.body.dateOfBirth, fieldKey: 'body.dateOfBirth' },
        {
          label: t('documents.passport.sex'),
          value: t(document.body.sex === 'M' ? 'common.sex.male' : 'common.sex.female'),
          fieldKey: 'body.sex'
        },
        {
          label: t('documents.passport.issuingRegion'),
          value: document.body.issuingRegion,
          fieldKey: 'body.issuingRegion'
        },
        {
          label: t('documents.passport.passportNumber'),
          value: document.body.passportNumber,
          fieldKey: 'body.passportNumber'
        },
        { label: t('documents.validFrom'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('documents.validUntil'), value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
