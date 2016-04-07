import Immutable, { fromJS, List } from 'immutable'
import { COMPLETE_MINI_ARTICLE, SET_VISIBILITY_FILTER, VisibilityFilters,
         FETCH_MINI_ARTICLES, FETCH_MINI_ARTICLES_FAILED, FETCH_MINI_ARTICLES_SUCCESS, UPDATE_ARTICLE_SUCCESS } from './snippets.actions.js'
import { syncTweet } from 'businessLogic/firebase/firebase'
const { SHOW_ACTIVE } = VisibilityFilters

import snippetsActionsTypes from './snippets.action-types'
const { FETCH_SNIPPETS_STARTED, FETCH_SNIPPETS_SUCCESS, FETCH_SNIPPETS_FAILED } = snippetsActionsTypes
const { FETCH_SNIPPETS_STANDARD_STARTED, FETCH_SNIPPETS_STANDARD_SUCCESS, FETCH_SNIPPETS_STANDARD_FAILED } = snippetsActionsTypes


const initialState = getInitialState()

function getInitialState() {
  return fromJS({
    isFetching: false,
    snippetList: [],
    fetchingError: '',
  }, createListIfPossible)
}

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
    case FETCH_SNIPPETS_STARTED:
      return state.set('isFetching', true)
    case FETCH_SNIPPETS_SUCCESS:
      return state.set('isFetching', false).set('snippetList', new List(action.payload.data.map(mapTwitterResponse)))
    case FETCH_SNIPPETS_FAILED:
      return state.merge({ isFetching: false, fetchingError: action.payload.err })
    case FETCH_SNIPPETS_STANDARD_STARTED:
      return state.set('isFetching', true)
    case FETCH_SNIPPETS_STANDARD_SUCCESS:
      return getInitialState().set('snippetList', new List(action.payload.data.map(mapTwitterResponse)))
    case FETCH_SNIPPETS_STANDARD_FAILED:
      return state.merge({ isFetching: false, fetchingError: action.error })






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

function mapTwitterResponse(data) {
  return {
    id: data.id,
    id_str: data.id_str,
    text: expandUrls(data.text, data.entities.urls),
    completed: false,
    profileImage: data.user.profile_image_url_https,
    favoriteCount: data.favorite_count,
    retweeted: data.retweeted,
    retweetCount: data.retweet_count,
    image: getMedia(data.entities.media),
    entities: data.entities,
    quotedStatus: data.quoted_status,
    quoted_status_id: data.quoted_status_id,
    quoted_status_id_str: data.quoted_status_id_str,
    user: data.user,
    contributors: data.contributors,
    coordinates: data.coordinates,
    created_at: data.created_at,
    geo: data.geo,
    in_reply_to_screen_name: data.in_reply_to_screen_name,
    in_reply_to_status_id: data.in_reply_to_status_id,
    in_reply_to_status_id_str: data.in_reply_to_status_id_str,
    in_reply_to_user_id: data.in_reply_to_user_id,
    in_reply_to_user_id_str: data.in_reply_to_user_id_str,
    is_quote_status: data.is_quote_status,
    lang: data.lang,
    metadata: data.metadata,
    place: data.place,
    possibly_sensitive: data.possibly_sensitive,
    truncated: data.truncated,
    source: data.source,
  }
}

function getMedia(media = []) {
  return media[0] ? media[0].media_url_https : ''
}

function expandUrls(text, urls = []) {
  let newText = text
  urls.forEach(url => {
    newText = newText.replace(url.url, url.expanded_url)
  })
  return newText
}