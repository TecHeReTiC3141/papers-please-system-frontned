type ModalProps = { open: boolean; onClose: () => void }

export function AttachExistingModal({ open, onClose }: ModalProps) {
  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Attach existing documents</h3>

        <p>[Multiselect of user documents]</p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
