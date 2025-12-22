import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type RejectModalProps = {
  open: boolean
  onClose: () => void
  onReject: (reason: string) => void
}

const MIN_REASON_LENGTH = 10

export function RejectModal({ open, onClose, onReject }: RejectModalProps) {
  const { t } = useTranslation()
  const [reason, setReason] = useState('')

  if (!open) return null

  const handleReject = () => {
    onReject(reason)
    onClose()
    setReason('')
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t('ticket.reject.title')}</h3>

        <textarea
          className="textarea textarea-bordered w-full mt-4"
          placeholder={t('ticket.reject.reason.placeholder', { min: MIN_REASON_LENGTH })}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {t('common.actions.cancel')}
          </button>
          <button className="btn btn-error" disabled={reason.trim().length < MIN_REASON_LENGTH} onClick={handleReject}>
            {t('common.actions.reject')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
