import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useLoginApi } from '../api/login'
import { useNavigate } from 'react-router'
import { UserRole, type User } from '@entities/user'

const loginNavigation = {
  [UserRole.GOD]: '/admin',
  [UserRole.BOSS]: '/tickets',
  [UserRole.INSPECTOR]: '/tickets',
  [UserRole.SECURITY]: '/tickets',
  [UserRole.MIGRANT]: '/applications'
}

export const useLogin = () => {
  const loginApi = useLoginApi()
  const signIn = useSignIn<User>()
  const navigate = useNavigate()

  return async (values: { email: string; password: string }) => {
    const { data, status } = await loginApi(values)

    const userData = data.user as User

    if (status === 200) {
      if (
        signIn({
          auth: {
            token: data.accessToken,
            type: 'Bearer'
          },
          refresh: data.refreshToken,
          userState: userData
        })
      ) {
        navigate(loginNavigation[userData.role])
      } else {
        throw new Error('Could not sign in user')
      }
    } else {
      throw new Error('Incorrect email or password')
    }
  }
}
