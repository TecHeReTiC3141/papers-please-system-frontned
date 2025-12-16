type ModalProps = {
  open: boolean
  onClose: () => void
  onCancel: () => void
}

export function CloseApplicationModal({ open, onClose, onCancel }: ModalProps) {
  if (!open) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Close application</h3>

        <p className="py-4">Are you sure you want to close this modal?</p>

        <div className="modal-action">
          <button className="btn btn-error" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
