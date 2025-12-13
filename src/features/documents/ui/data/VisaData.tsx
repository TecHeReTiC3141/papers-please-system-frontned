import type { VisaDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: VisaDocument
}

export function VisaData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Holder name', value: document.holderName },
        { label: 'Nationality', value: document.nationality },
        { label: 'Purpose', value: document.purpose },
        { label: 'Duration (days)', value: document.durationDays },
        { label: 'Issue date', value: document.issueDate },
        { label: 'Expires at', value: document.expiresAt },
        { label: 'Visa ID', value: document.visaId }
      ]}
    />
  )
}
