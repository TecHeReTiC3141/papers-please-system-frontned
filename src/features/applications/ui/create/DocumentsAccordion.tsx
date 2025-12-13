import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { type AnyDocument } from '@/entities/document/types'
import { documentTitleMap } from '@/features/documents/model'
import { renderDocumentData } from '@/features/documents/lib'
import classNames from 'classnames'

type Props = {
  documents: AnyDocument[]
  onEdit: (doc: AnyDocument) => void
  onDelete: (doc: AnyDocument) => void
}

export function DocumentsAccordion({ documents, onEdit, onDelete }: Props) {
  if (!documents.length) {
    return <div className="text-center text-base-content/60 py-6">No documents attached yet</div>
  }

  return (
    <div className="join join-vertical w-full">
      {documents.map((doc, index) => (
        <details
          key={doc.type}
          className={classNames(
            'collapse collapse-arrow join-item border-2 border-base-300',
            index % 2 && 'bg-base-100'
          )}
        >
          <summary className="collapse-title flex items-center justify-between gap-4">
            <span className="text-lg font-medium">
              {index + 1}. {documentTitleMap[doc.type]}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn btn-xs btn-ghost"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onEdit(doc)
                }}
              >
                <FiEdit2 />
              </button>

              <button
                type="button"
                className="btn btn-xs btn-ghost text-error"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDelete(doc)
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          </summary>

          <div className="collapse-content">{renderDocumentData(doc)}</div>
        </details>
      ))}
    </div>
  )
}
