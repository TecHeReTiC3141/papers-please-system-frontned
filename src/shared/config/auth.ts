import createStore from 'react-auth-kit/createStore'

export const authStore = createStore({
  authType: 'cookie',
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
})
