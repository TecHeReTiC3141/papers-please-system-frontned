import type { PassportDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: PassportDocument
}

export function PassportData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Name', value: document.fullName },
        { label: 'Country', value: document.country },
        { label: 'Date of birth', value: document.dateOfBirth },
        { label: 'Sex', value: document.sex === 'M' ? 'Male' : 'Female' },
        { label: 'Region', value: document.issuingRegion },
        { label: 'Expires at', value: document.expiresAt }
      ]}
    />
  )
}
