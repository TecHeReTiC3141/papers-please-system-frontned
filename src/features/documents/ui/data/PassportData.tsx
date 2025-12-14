import type { PassportDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: PassportDocument
  inspectorMode?: boolean
}

export function PassportData({ document, inspectorMode = false }: Props) {
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: 'Name', value: document.body.fullName, fieldKey: 'body.fullName' },
        { label: 'Country', value: document.body.country, fieldKey: 'body.country' },
        { label: 'Date of birth', value: document.body.dateOfBirth, fieldKey: 'body.dateOfBirth' },
        { label: 'Sex', value: document.body.sex === 'M' ? 'Male' : 'Female', fieldKey: 'body.sex' },
        { label: 'Region', value: document.body.issuingRegion, fieldKey: 'body.issuingRegion' },
        { label: 'Issue date', value: document.validFrom, fieldKey: 'validFrom' },
        { label: 'Expires at', value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
