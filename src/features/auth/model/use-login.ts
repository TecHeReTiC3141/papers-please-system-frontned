import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useLoginApi } from '../api/login'

export const useLogin = () => {
  const loginApi = useLoginApi()
  const signIn = useSignIn()

  return async (values: { email: string; password: string }) => {
    const { data } = await loginApi(values)

    signIn({
      token: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      tokenType: 'Bearer',
      authState: { role: data.role, userId: data.id }
    })
  }
}
