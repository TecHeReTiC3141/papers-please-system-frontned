import type { UserExtendedInfo } from '@/entities/user'
import { MdEdit } from 'react-icons/md'
import { UserAvatar } from './UserAvatar'
import { InfoField, Loader } from '@/shared/ui'
import { checkIfBossInfo, checkIfInspectorInfo } from '../lib/check-roles'
import { InspectorSection } from './InspectorSection'
import { BossSection } from './BossSection'

type Props = {
  userData: UserExtendedInfo | null
  isLoading: boolean
}

export function UserInfo({ userData, isLoading }: Props) {
  if (!userData || isLoading) {
    return <Loader text="Loading user info..." />
  }

  return (
    <div className="relative p-24 top-48 pt-64 rounded-xl w-[900px] mx-auto bg-base-300">
      <UserAvatar userData={userData} />
      <div className="flex flex-col gap-y-3 items-start">
        <InfoField value={userData.email} label="Email" />
        {checkIfInspectorInfo(userData) && <InspectorSection extendedInspectorInfo={userData} />}
        {checkIfBossInfo(userData) && <BossSection extendedBossInfo={userData} />}
      </div>
    </div>
  )
}
