import type { CertificateDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

type Props = {
  document: CertificateDocument
  inspectorMode?: boolean
}

export function CertificateData({ document, inspectorMode = false }: Props) {
  const { t } = useTranslation()
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        {
          label: t('documents.certificate.certificateType'),
          value: document.body.certificateType,
          fieldKey: 'body.certificateType'
        },
        { label: t('documents.certificate.holderName'), value: document.body.holderName, fieldKey: 'body.holderName' },
        { label: t('documents.certificate.issuedBy'), value: document.body.issuedBy, fieldKey: 'body.issuedBy' },
        {
          label: t('documents.certificate.additionalInfo'),
          value: document.body.additionalInfo,
          fieldKey: 'body.additionalInfo'
        },
        { label: t('documents.validFrom'), value: document.validFrom, fieldKey: 'validFrom' },
        { label: t('documents.validUntil'), value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
