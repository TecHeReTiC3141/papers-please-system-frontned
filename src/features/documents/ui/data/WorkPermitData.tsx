import type { WorkPermitDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: WorkPermitDocument
  inspectorMode?: boolean
}

export function WorkPermitData({ document, inspectorMode = false }: Props) {
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: 'Worker name', value: document.body.workerName, fieldKey: 'body.workerName' },
        { label: 'Occupation', value: document.body.occupation, fieldKey: 'body.occupation' },
        { label: 'Employer', value: document.body.employer, fieldKey: 'body.employer' },
        { label: 'Issue date', value: document.validFrom, fieldKey: 'validFrom' },
        { label: 'Expires at', value: document.validUntil, fieldKey: 'validUntil' },
        { label: 'Permit ID', value: document.body.permitId, fieldKey: 'body.permitId' }
      ]}
    />
  )
}
