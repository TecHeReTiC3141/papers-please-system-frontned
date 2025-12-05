import { useExtendedUserInfo } from '@/features/user-info/model'
import { UserInfo } from '@/features/user-info/ui'
import { useQuery } from '@tanstack/react-query'

export function ProfilePage() {
  const fetchUserData = useExtendedUserInfo()

  const userInfo = useQuery({
    queryKey: ['profile'],
    queryFn: fetchUserData
  })

  return <UserInfo userData={userInfo.data ?? null} isLoading={userInfo.isPending} />
}
