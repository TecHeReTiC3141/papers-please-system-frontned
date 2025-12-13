import type { CertificateDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: CertificateDocument
}

export function CertificateData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Certificate type', value: document.body.certificateType },
        { label: 'Holder name', value: document.body.holderName },
        { label: 'Additional info', value: document.body.additionalInfo },
        { label: 'Issue date', value: document.validFrom },
        { label: 'Expires at', value: document.validUntil }
      ]}
    />
  )
}
