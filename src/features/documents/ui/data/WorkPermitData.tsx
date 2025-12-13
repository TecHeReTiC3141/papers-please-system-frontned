import type { WorkPermitDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: WorkPermitDocument
}

export function WorkPermitData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Worker name', value: document.body.workerName },
        { label: 'Occupation', value: document.body.occupation },
        { label: 'Employer', value: document.body.employer },
        { label: 'Issue date', value: document.validFrom },
        { label: 'Expires at', value: document.validUntil },
        { label: 'Permit ID', value: document.body.permitId }
      ]}
    />
  )
}
