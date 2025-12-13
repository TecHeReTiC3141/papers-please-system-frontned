import type { PhotoDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: PhotoDocument
}

export function PhotoData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Owner', value: document.body.ownerName },
        { label: 'Resolution', value: document.body.resolution },
        {
          label: 'Photo',
          value: (
            <img src={document.body.imageUrl} alt="Document photo" className="w-24 rounded-md border border-base-300" />
          )
        },
        { label: 'Issue date', value: document.validFrom },
        { label: 'Expires at', value: document.validUntil }
      ]}
    />
  )
}
