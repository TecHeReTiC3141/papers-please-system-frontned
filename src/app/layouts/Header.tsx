import { UserRole, type User } from '@entities/user'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Link, useNavigate } from 'react-router'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { useState } from 'react'
import { LogoutModal } from '@features/auth/ui'
import { IoTicketSharp } from 'react-icons/io5'
import { UserPreview } from '@/shared/ui/UserPreview'
import { ShiftStatus } from '@/features/shifts/ui'

const EMPLOYEES_ROLES = [UserRole.INSPECTOR, UserRole.BOSS, UserRole.SECURITY]

export function Header() {
  const userData = useAuthUser<User>()
  const [isLogoutModalOpened, setIsLogoutModalOpened] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className="navbar justify-between bg-base-200 shadow-md px-8 border-b border-neutral-content">
        <Link to="/" className="text-xl font-bold flex-1">
          Papers Please
        </Link>
        <img src="/logo.png" />
        <div className="flex-1 flex justify-end items-center gap-x-3">
          {userData?.role === UserRole.BOSS && <ShiftStatus />}
          {userData && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <UserPreview user={userData} showName={false} />
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-fix p-2 shadow text-nowrap"
              >
                <li>
                  <Link to="/profile" className="justify-end text-nowrap">
                    <FaUser />
                    User info
                  </Link>
                </li>
                {EMPLOYEES_ROLES.includes(userData.role) && (
                  <li>
                    <Link to="/tickets" className="justify-end text-nowrap">
                      <IoTicketSharp />
                      Tickets
                    </Link>
                  </li>
                )}
                {userData.role === UserRole.MIGRANT && (
                  <li>
                    <Link to="/applications" className="justify-end text-nowrap">
                      <IoTicketSharp />
                      Applications
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={() => setIsLogoutModalOpened(true)} className="justify-end text-nowrap">
                    <MdLogout />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <LogoutModal
        isOpen={isLogoutModalOpened}
        onClose={() => setIsLogoutModalOpened(false)}
        onConfirm={() => navigate('/login')} // if needed
      />
    </>
  )
}
