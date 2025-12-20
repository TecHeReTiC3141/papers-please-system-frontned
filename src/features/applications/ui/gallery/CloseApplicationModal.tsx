import { useTranslation } from 'react-i18next'

type ModalProps = {
  open: boolean
  onClose: () => void
  onCancel: () => void
}

export function CloseApplicationModal({ open, onClose, onCancel }: ModalProps) {
  const { t } = useTranslation()

  if (!open) return null

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t('applications.closeModal.title')}</h3>

        <p className="py-4">{t('applications.closeModal.content')}</p>

        <div className="modal-action">
          <button className="btn btn-error" onClick={onClose}>
            {t('common.actions.close')}
          </button>
          <button className="btn btn-ghost" onClick={onCancel}>
            {t('common.actions.cancel')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
