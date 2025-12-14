type ModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ApproveModal({ open, onClose, onConfirm }: ModalProps) {
  if (!open) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Approve ticket</h3>

        <p className="py-4">Are you sure you want to approve this ticket?</p>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={onConfirm}>
            Approve
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
