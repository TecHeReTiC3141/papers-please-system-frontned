import { useNavigate } from 'react-router'
import { useGetActiveShift } from '../model/use-get-active-shift'
import { canCloseShift, formatShiftDuration } from '../lib'
import { Loader } from '@/shared/ui'
import { FaChevronDown, FaPowerOff, FaPlay, FaInfo, FaBan } from 'react-icons/fa6'
import { CloseShiftModal } from './CloseShiftModal'
import { useTranslation } from 'react-i18next'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { UserRole, type User } from '@/entities/user'

export function ShiftStatus() {
  const { t } = useTranslation()
  const user = useAuthUser<User>()

  const navigate = useNavigate()
  const { data: activeShift, isLoading } = useGetActiveShift()

  if (isLoading) {
    return <Loader text={t('header.shiftStatus.loading')} />
  }

  if (!activeShift) {
    if (user?.role === UserRole.BOSS) {
      return (
        <button className="btn btn-sm btn-success flex gap-2" onClick={() => navigate('/shifts/open')}>
          <FaPlay />
          {t('header.shiftStatus.openNew')}
        </button>
      )
    }
    return (
      <button className="btn btn-sm flex gap-2">
        <FaBan />
        {t('header.shiftStatus.noShiftToday')}
      </button>
    )
  }

  const closable = canCloseShift(activeShift.startTime)

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-warning flex gap-2 items-center">
        {t('header.shiftStatus.shiftDuration', { duration: formatShiftDuration(activeShift.startTime) })}
        <FaChevronDown />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box shadow p-2 w-40">
        <li className="text-sm">
          <button
            className="text-info"
            onClick={() =>
              navigate({
                search: `?shift=${activeShift.id}`
              })
            }
          >
            <FaInfo />
            {t('header.shiftStatus.shiftInfo')}
          </button>
        </li>
        {user?.role === UserRole.BOSS && (
          <>
            {closable ? (
              <li>
                <button
                  className="text-error flex gap-2"
                  onClick={() =>
                    navigate({
                      search: `?closeShift=${activeShift.id}`
                    })
                  }
                >
                  <FaPowerOff />
                  {t('header.shiftStatus.close')}
                </button>
              </li>
            ) : (
              <li className="px-3 py-2 text-sm text-base-content/60">{t('header.shiftStatus.cantClose')}</li>
            )}
          </>
        )}
      </ul>
      <CloseShiftModal />
    </div>
  )
}
