import type { UserExtendedInfo } from '@/entities/user'
import { UserAvatar } from './UserAvatar'
import { InfoField, Loader } from '@/shared/ui'
import { checkIfBossInfo, checkIfInspectorInfo, checkIfMigrantInfo } from '../lib/check-roles'
import { InspectorSection } from './InspectorSection'
import { BossSection } from './BossSection'
import { MigrantSection } from './MigrantSection'

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
        {checkIfMigrantInfo(userData) && <MigrantSection extendedMigrantInfo={userData} />}
      </div>
    </div>
  )
}
