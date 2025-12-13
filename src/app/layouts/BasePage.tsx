import { UserRole, type User } from '@/entities/user'
import { useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate } from 'react-router'

const loginNavigation = {
  [UserRole.GOD]: '/admin',
  [UserRole.BOSS]: '/tickets',
  [UserRole.INSPECTOR]: '/tickets',
  [UserRole.SECURITY]: '/tickets',
  [UserRole.MIGRANT]: '/applications'
}

export function BasePage() {
  const navigate = useNavigate()

  const userData = useAuthUser<User>()

  useEffect(() => {
    if (userData) {
      navigate(loginNavigation[userData.role])
    } else {
      navigate('/login')
    }
  }, [userData])

  return <div>Main page</div>
}
