import type { PhotoDocument } from '@/entities/document/types'
import { DetailsList } from '@/shared/ui'

type Props = {
  document: PhotoDocument
}

export function PhotoData({ document }: Props) {
  return (
    <DetailsList
      items={[
        { label: 'Owner', value: document.ownerName },
        { label: 'Resolution', value: document.resolution },
        { label: 'Taken at', value: document.takenAt },
        {
          label: 'Photo',
          value: <img src={document.imageUrl} alt="Document photo" className="w-24 rounded-md border border-base-300" />
        }
      ]}
    />
  )
}
