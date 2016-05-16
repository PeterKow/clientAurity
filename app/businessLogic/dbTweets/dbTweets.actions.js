import fetch from 'request'
import actionTypes from './dbTweets.actionTypes'
const { FETCH_TEST } = actionTypes

export { fetchTest }

function fetchTest(payload) {
  return ({ dispatch }) => {
    const action = {
      type: FETCH_TEST,
      promise: fetch('/dbTest'),
      payload,
    }
    return dispatch(action)
  }
}

// function openOpenHoursNav(payload) {
//   return { type: SHOW_OPEN_HOURS_NAV, payload }
// }
//
// function hideOpenHoursNav(payload) {
//   return { type: HIDE_OPEN_HOURS_NAV, payload }
// }
//
// function updateOpenTag(payload) {
//   return ({ dispatch }) => {
//     let action
//     if (payload.tag === 'Close') {
//       action = {
//         type: UPDATE_OPEN_TAG,
//         promise: Partner.tags.add({ tag: 'not_serving' }),
//         payload,
//       }
//     } else {
//       action = {
//         type: UPDATE_OPEN_TAG,
//         promise: Partner.tags.remove('not_serving'),
//         payload,
//       }
//     }
//
//     return dispatch(action)
//   }
// }
