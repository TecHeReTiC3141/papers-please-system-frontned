import type { User } from '@/entities/user'
import classNames from 'classnames'

type Props = {
  user: User
  avatarSize?: number
  showName?: boolean
  isButton?: boolean
}

export function UserPreview({ user, avatarSize = 24, showName = true, isButton = true }: Props) {
  const userInitials = user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
  return (
    <div className="flex gap-x-3 items-center">
      <div className={classNames('avatar', isButton && 'btn btn-ghost btn-circle')}>
        <div className="p-2 w-10 rounded-full flex items-center justify-center border border-gray-100">
          <p className="font-bold text-lg">{userInitials}</p>
        </div>
      </div>
      {showName && <p>{user.name}</p>}
    </div>
  )
}
