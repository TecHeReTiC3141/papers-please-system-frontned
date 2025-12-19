import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useTranslation } from 'react-i18next'
import { MdLogout } from 'react-icons/md'

type LogoutModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const { t } = useTranslation()
  const signOut = useSignOut()

  const handleLogout = () => {
    signOut()
    onConfirm?.()
    onClose()
  }

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <MdLogout className="text-xl" />
          {t('logout.title')}
        </h3>

        <p className="py-4">{t('logout.content')}</p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            {t('common.cancel')}
          </button>

          <button className="btn btn-error" onClick={handleLogout}>
            {t('logout.logoutBtn')}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>{t('close')}</button>
      </form>
    </dialog>
  )
}
