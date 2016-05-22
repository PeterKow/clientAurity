import { List } from 'immutable'
import { genericReducer, createInitStore } from 'utils/redux/generic-reducer'
import { SET_VISIBILITY_FILTER, VisibilityFilters } from './snippets.actions.js'
import { mapSnippet } from './snippet.model'
const { SHOW_ACTIVE } = VisibilityFilters

import snippetsActionsTypes from './snippets.action-types'
const { FETCH_SNIPPETS_SUCCESS, SET_VISIBILITY_TEXT_FILTER } = snippetsActionsTypes
const { FETCH_SNIPPETS_STANDARD_SUCCESS, COMPLETE_SNIPPET_SUCCESS } = snippetsActionsTypes

export { createInitialState }
export { snippetReducer }

export default highOrderSnippetReducer

function createInitialState() {
  return {
    snippetList: [],
    fetchingError: '',
    searchText: undefined,
  }
}

function getInitialState() {
  return createInitStore(createInitialState())
}

const initialState = getInitialState()
console.log('initial state', initialState)

export function visibilityFilter(state = SHOW_ACTIVE, action = { type: undefined }) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export function snippetReducer(state = initialState, action = { type: undefined }) {
  switch (action.type) {
    case FETCH_SNIPPETS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('snippetList',
        new List(action.payload.data.map(mapSnippet))
        )
    case FETCH_SNIPPETS_STANDARD_SUCCESS:
      return getInitialState().set('snippetList', new List(action.payload.data.map(mapSnippet)))

    case SET_VISIBILITY_TEXT_FILTER:
      return state.set('searchText', action.filter)
    case COMPLETE_SNIPPET_SUCCESS:
      {
        const { idStr, completed } = action.startedPayload
        return state
          .setIn([
            'snippetList',
            state.get('snippetList').findIndex(snippet => snippet.get('idStr') === idStr.toString()),
            'completed',
          ], completed)
      }

    default:
      return state;
  }
}

function highOrderSnippetReducer(state = initialState, action) {
  const nextState = genericReducer(state, action)
  console.log('next state', nextState)
  return snippetReducer(
    nextState,
    action
  )
}
