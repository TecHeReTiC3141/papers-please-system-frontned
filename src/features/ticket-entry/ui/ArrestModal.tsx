import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type ArrestModalProps = {
  open: boolean
  onClose: () => void
  onArrest: (reason: string) => void
}

const MIN_REASON_LENGTH = 100

export function ArrestModal({ open, onClose, onArrest }: ArrestModalProps) {
  const { t } = useTranslation()
  const [reason, setReason] = useState('')

  if (!open) return null

  const handleArrest = () => {
    onArrest(reason)
    setReason('')
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t('ticket.arrest.title')}</h3>

        <textarea
          className="textarea textarea-bordered w-full mt-4"
          placeholder={t('ticket.arrest.reason.placeholder', { min: MIN_REASON_LENGTH })}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {t('common.actions.cancel')}
          </button>
          <button className="btn btn-error" disabled={reason.trim().length < MIN_REASON_LENGTH} onClick={handleArrest}>
            {t('ticket.arrest.action')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
