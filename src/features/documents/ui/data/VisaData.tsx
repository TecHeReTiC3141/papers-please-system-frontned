import type { VisaDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: VisaDocument
  inspectorMode?: boolean
}

export function VisaData({ document, inspectorMode = false }: Props) {
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: 'Holder name', value: document.body.holderName, fieldKey: 'body.holderName' },
        { label: 'Nationality', value: document.body.nationality, fieldKey: 'body.nationality' },
        { label: 'Purpose', value: document.body.purpose, fieldKey: 'body.purpose' },
        { label: 'Duration (days)', value: document.body.durationDays, fieldKey: 'body.durationDays' },
        { label: 'Issue date', value: document.validFrom, fieldKey: 'validFrom' },
        { label: 'Expires at', value: document.validUntil, fieldKey: 'validUntil' },
        { label: 'Visa ID', value: document.body.visaId, fieldKey: 'body.visaId' }
      ]}
    />
  )
}
