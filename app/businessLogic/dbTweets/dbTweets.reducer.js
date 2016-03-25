import Immutable from 'immutable'
import actionTypes from './dbTweets.actionTypes'
const { FETCH_TEST_STARTED } = actionTypes

const initialState = Immutable.fromJS({
  isFetching: false,
})

export default function tagsReducer(state = initialState, action = { type: undefined }) {
  switch (action.type) {
    case FETCH_TEST_STARTED:
      return state.set('isFetching', true)
    //case FETCH_OPEN_TAG_SUCCESS:
    //  return state.merge({ isFetching: false, venueOpenStatus: isOpenTag(action.payload) })
    //case FETCH_OPEN_TAG_FAILED:
    //case UPDATE_OPEN_TAG_FAILED:
    //  return state.set('isFetching', false)
    //case SHOW_OPEN_HOURS_NAV:
    //  return state.set('showOpenHoursNav', true)
    //case HIDE_OPEN_HOURS_NAV:
    //  return state.set('showOpenHoursNav', false)
    //case UPDATE_OPEN_TAG_SUCCESS:
    //  return state.merge({ isFetching: false, venueOpenStatus: action.payload.startedPayload.tag })
    default:
      return state
  }
}
