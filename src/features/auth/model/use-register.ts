import { useRegisterApi } from '../api/register'
import type { RegisterRequest } from './types'

export const useRegister = () => {
  const registerApi = useRegisterApi()

  return async (values: RegisterRequest) => {
    await registerApi(values)
  }
}
