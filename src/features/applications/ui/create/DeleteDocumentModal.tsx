import { type AnyDocument } from '@/entities/document/types'
import { documentTitleMap } from '@/features/documents/model'

type Props = {
  open: boolean
  document: AnyDocument | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDocumentModal({ open, document, onClose, onConfirm }: Props) {
  if (!open || !document) return null

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Delete document</h3>

        <p className="text-base-content/80">
          Are you sure you want to delete <span className="font-semibold">{documentTitleMap[document.type]}</span>?
        </p>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-error" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
