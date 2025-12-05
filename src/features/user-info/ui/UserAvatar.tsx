import type { User } from '@entities/user'
import { formatUserRole } from '@shared/lib'
import { FaUser } from 'react-icons/fa'

type Props = {
  userData: User
}

export function UserAvatar({ userData }: Props) {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-[50%] -translate-y-[40%] flex flex-col gap-y-4 text-center">
      <div className="avatar">
        <div className="w-56 rounded-full flex justify-center items-center bg-gray-100 text-primary">
          <FaUser size={128} />
        </div>
      </div>
      <p className="text-xl font-bold">{userData.name}</p>
      <p className="text-lg font-light">{formatUserRole(userData.role)}</p>
    </div>
  )
}
