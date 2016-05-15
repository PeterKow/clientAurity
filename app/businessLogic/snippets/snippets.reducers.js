import { List } from 'immutable'
import { genericReducer, createInitStore } from 'utils/redux/generic-reducer'
import { COMPLETE_MINI_ARTICLE, SET_VISIBILITY_FILTER, VisibilityFilters,
  UPDATE_ARTICLE_SUCCESS } from './snippets.actions.js'
import { syncTweet } from 'businessLogic/firebase/firebase'
import { mapSnippet } from './snippet.model'
const { SHOW_ACTIVE } = VisibilityFilters

import snippetsActionsTypes from './snippets.action-types'
const { FETCH_SNIPPETS_SUCCESS, SET_VISIBILITY_TEXT_FILTER } = snippetsActionsTypes
const { FETCH_SNIPPETS_STANDARD_SUCCESS } = snippetsActionsTypes

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
      return state.set('isFetching', false).set('snippetList', new List(action.payload.data.map(mapSnippet)))
    case FETCH_SNIPPETS_STANDARD_SUCCESS:
      return getInitialState().set('snippetList', new List(action.payload.data.map(mapSnippet)))

    case SET_VISIBILITY_TEXT_FILTER:

      return state.set('searchText', action.filter)

      //console.log('sni', newState)
      //return state.set('snippetList',newState)
    //case COMPLETE_MINI_ARTICLE:
    //  const newState = state.get('snippetsList').toFIXmeDudeImmutable().map(miniArticle =>
    //    miniArticle.id_str === action.id ?
    //    { ...miniArticle, completed: !miniArticle.completed } :
    //      miniArticle
    //  )
    //  console.log('NO SYNC TO firebase!!')
    //  //syncWithFirebase(newState, action.id)
    //  return newState
    case UPDATE_ARTICLE_SUCCESS:
      return state.get('snippetsList').toFIXmeDudeImmutable_UPDATE_ARTICLE_SUCCESS().map(miniArticle =>
        miniArticle.id_str === action.payload.id_str ? action.payload : miniArticle
      )
    default:
      return state;
  }
}

function syncWithFirebase(miniArticles, id_str) {
  const article = miniArticles.filter(article => article.id_str === id_str)[0]
  syncTweet(article)
}

function highOrderSnippetReducer(state = initialState, action) {
  const nextState = genericReducer(state, action)
  console.log('next state', nextState)
  return snippetReducer(
    nextState,
    action
  )
}
