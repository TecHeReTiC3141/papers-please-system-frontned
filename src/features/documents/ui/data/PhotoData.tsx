import type { PhotoDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: PhotoDocument
  inspectorMode?: boolean
}

export function PhotoData({ document, inspectorMode = false }: Props) {
  return (
    <DetailsList
      inspectorMode={inspectorMode}
      items={[
        { label: 'Owner', value: document.body.ownerName, fieldKey: 'body.ownerName' },
        { label: 'Resolution', value: document.body.resolution, fieldKey: 'body.resolution' },
        {
          label: 'Photo',
          value: (
            <img src={document.body.imageUrl} alt="Document photo" className="w-24 rounded-md border border-base-300" />
          ),
          fieldKey: 'body.imageUrl'
        },
        { label: 'Issue date', value: document.validFrom, fieldKey: 'validFrom' },
        { label: 'Expires at', value: document.validUntil, fieldKey: 'validUntil' }
      ]}
    />
  )
}
