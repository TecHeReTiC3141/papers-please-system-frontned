import { useNavigate } from 'react-router'
import { useGetActiveShift } from '../model/use-get-active-shift'
import { canCloseShift, formatShiftDuration } from '../lib'
import { Loader } from '@/shared/ui'
import { FaChevronDown, FaPowerOff, FaPlay } from 'react-icons/fa6'

export function ShiftStatus() {
  const navigate = useNavigate()
  const { data: activeShift, isLoading } = useGetActiveShift()

  if (isLoading) {
    return <Loader text="Loading active shift..." />
  }

  if (!activeShift) {
    return (
      <button className="btn btn-sm btn-success flex gap-2" onClick={() => navigate('/shifts/open')}>
        <FaPlay />
        Open new shift
      </button>
    )
  }

  const closable = canCloseShift(activeShift.startTime)

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-warning flex gap-2 items-center">
        Shift active · {formatShiftDuration(activeShift.startTime)}
        <FaChevronDown />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box shadow p-2 w-56">
        {closable ? (
          <li>
            <button className="text-error flex gap-2" onClick={() => navigate(`/shift/${activeShift.id}/close`)}>
              <FaPowerOff />
              Close shift
            </button>
          </li>
        ) : (
          <li className="px-3 py-2 text-sm text-base-content/60">Shift can be closed after 7 hours</li>
        )}
      </ul>
    </div>
  )
}
