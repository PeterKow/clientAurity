import { authTwitter, twitterLogout } from './user.actions.js'
import { UNAUTHORISED } from './user.actionTypes'
import auth from 'utils/auth'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
  }
}

export function logout() {
  return dispatch => {
    dispatch(twitterLogout())
    auth.removeTwitterTokens()
    console.log('NO PUSH STATE')
  }
}

export function unauthorised(data) {
  console.log('NO PUSH STATE')
  auth.removeTwitterTokens()
  return { type: UNAUTHORISED, data }
}

// ex port function loginSuccess(response) {
//   const { __v, ...data } = response
//   return dispatch => {
//     dispatch({ type: LOGIN_SUCCESS, data })
//     const { twitter: { secret, token } } = data
//     auth.setTwitterTokens({ token, secret })
//     console.log('NO PUSH STATE')
//   }
// }
