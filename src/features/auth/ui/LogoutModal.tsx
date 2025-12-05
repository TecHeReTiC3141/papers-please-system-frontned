import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { MdLogout } from 'react-icons/md'

type LogoutModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
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
          Выход из аккаунта
        </h3>

        <p className="py-4">Вы действительно хотите выйти?</p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Отмена
          </button>

          <button className="btn btn-error" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      {/* Модальное затемнение */}
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}
