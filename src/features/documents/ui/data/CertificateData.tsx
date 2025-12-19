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
        { label: 'Certificate type', value: document.body.certificateType, fieldKey: 'body.certificateType' },
        { label: 'Holder name', value: document.body.holderName, fieldKey: 'body.holderName' },
        { label: 'Additional info', value: document.body.additionalInfo, fieldKey: 'body.additionalInfo' },
        { label: 'Issue date', value: document.validFrom, fieldKey: 'validFrom' },
        { label: 'Expires at', value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
