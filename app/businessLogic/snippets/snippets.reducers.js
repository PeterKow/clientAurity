import Immutable, { fromJS, List } from 'immutable'
import { COMPLETE_MINI_ARTICLE, SET_VISIBILITY_FILTER, VisibilityFilters,
         FETCH_MINI_ARTICLES, FETCH_MINI_ARTICLES_FAILED, FETCH_MINI_ARTICLES_SUCCESS, UPDATE_ARTICLE_SUCCESS } from './snippets.actions.js'
import { syncTweet } from 'businessLogic/firebase/firebase'
const { SHOW_ACTIVE } = VisibilityFilters

const initialState = fromJS({
  isFetching: false,
  snippetList: [],
  fetchingError: '',
}, createListIfPossible)

export function visibilityFilter(state = SHOW_ACTIVE, action = { type: undefined }) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export function snippetReducer(state = initialState, action = { type: undefined}) {
  switch (action.type) {
    case FETCH_MINI_ARTICLES:
      return state.get('isFetching', true)
    case FETCH_MINI_ARTICLES_SUCCESS:
      console.log('DEVELOP setting user global')
      //if(action.data[0]) {
      //  window._userId = action.data[0].user.id
      //  window._screenName = action.data[0].user.screen_name
      //} else {
      //  console.log('NO DATA for search')
      //}
      return state.set('isFetching', false).set('snippetList', new List(action.data))
    case FETCH_MINI_ARTICLES_FAILED:
      return state.set('fetchingError', action.data)
    case COMPLETE_MINI_ARTICLE:
      const newState = state.get('snippetsList').toFIXmeDudeImmutable().map(miniArticle =>
        miniArticle.id_str === action.id ?
        { ...miniArticle, completed: !miniArticle.completed } :
          miniArticle
      )
      console.log('NO SYNC TO firebase!!')
      //syncWithFirebase(newState, action.id)
      return newState
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

function createListIfPossible (key, value) {
  var isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
}
