import type { CertificateDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: CertificateDocument
}

export function CertificateData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Certificate type', value: document.certificateType },
        { label: 'Holder name', value: document.holderName },
        { label: 'Issued by', value: document.issuedBy },
        { label: 'Issue date', value: document.issueDate },
        { label: 'Additional info', value: document.additionalInfo }
      ]}
    />
  )
}
