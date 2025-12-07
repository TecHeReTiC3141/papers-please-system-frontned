import { ShiftInfoModal } from '@/features/shifts/ui'
import { useExtendedUserInfo } from '@/features/user-info/model'
import { UserInfo } from '@/features/user-info/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export function ProfilePage() {
  const [searchParams] = useSearchParams()
  const fetchUserData = useExtendedUserInfo()

  useEffect(() => {
    const shiftId = searchParams.get('shift')
    if (shiftId) {
      const shiftModal = document.getElementById('shift-modal') as HTMLDialogElement
      shiftModal.showModal()
    }
  }, [searchParams])

  const userInfo = useQuery({
    queryKey: ['profile'],
    queryFn: fetchUserData
  })

  return (
    <>
      <UserInfo userData={userInfo.data ?? null} isLoading={userInfo.isPending} />
      <ShiftInfoModal />
    </>
  )
}
