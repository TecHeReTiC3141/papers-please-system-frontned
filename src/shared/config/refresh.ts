import axios from 'axios'
import createRefresh from 'react-auth-kit/createRefresh'

export const refresh = createRefresh({
  interval: 10, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL
      })
      const response = await api.post('/auth/refresh', param, {
        headers: { Authorization: `Bearer ${param.authToken}` }
      })
      console.log('Refreshing')
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      }
    } catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: ''
      }
    }
  }
})
