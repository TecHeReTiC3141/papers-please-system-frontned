import { useTranslation } from 'react-i18next'

type ModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ApproveModal({ open, onClose, onConfirm }: ModalProps) {
  const { t } = useTranslation()

  if (!open) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t('ticket.approve.title')}</h3>

        <p className="py-4">{t('ticket.approve.content')}</p>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {t('common.actions.cancel')}
          </button>
          <button className="btn btn-success" onClick={handleConfirm}>
            {t('common.actions.approve')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
