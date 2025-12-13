import type { PassportDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: PassportDocument
}

export function PassportData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Name', value: document.body.fullName },
        { label: 'Country', value: document.body.country },
        { label: 'Date of birth', value: document.body.dateOfBirth },
        { label: 'Sex', value: document.body.sex === 'M' ? 'Male' : 'Female' },
        { label: 'Region', value: document.body.issuingRegion },
        { label: 'Issue date', value: document.validFrom },
        { label: 'Expires at', value: document.validUntil }
      ]}
    />
  )
}
