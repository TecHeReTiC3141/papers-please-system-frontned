import type { VisaDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: VisaDocument
}

export function VisaData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Holder name', value: document.body.holderName },
        { label: 'Nationality', value: document.body.nationality },
        { label: 'Purpose', value: document.body.purpose },
        { label: 'Duration (days)', value: document.body.durationDays },
        { label: 'Issue date', value: document.validFrom },
        { label: 'Expires at', value: document.validUntil },
        { label: 'Visa ID', value: document.body.visaId }
      ]}
    />
  )
}
