import type { WorkPermitDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: WorkPermitDocument
}

export function WorkPermitData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Worker name', value: document.workerName },
        { label: 'Occupation', value: document.occupation },
        { label: 'Employer', value: document.employer },
        { label: 'Issue date', value: document.issueDate },
        { label: 'Expires at', value: document.expiresAt },
        { label: 'Permit ID', value: document.permitId }
      ]}
    />
  )
}
