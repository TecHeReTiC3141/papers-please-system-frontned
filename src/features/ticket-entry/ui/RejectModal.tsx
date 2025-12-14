import { useState } from 'react'

type RejectModalProps = {
  open: boolean
  onClose: () => void
  onReject: (reason: string) => void
}

const MIN_REASON_LENGTH = 100

export function RejectModal({ open, onClose, onReject }: RejectModalProps) {
  const [reason, setReason] = useState('')

  if (!open) return null

  const handleReject = () => {
    onReject(reason)
    setReason('')
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Reject ticket</h3>

        <textarea
          className="textarea textarea-bordered w-full mt-4"
          placeholder={`Enter reject reason (min ${MIN_REASON_LENGTH} chars)...`}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error" disabled={reason.trim().length < MIN_REASON_LENGTH} onClick={handleReject}>
            Reject
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
