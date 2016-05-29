/*
 * action types
 */
import { searchByUsername, updateSnippet } from 'businessLogic/api/aurity/db.api'
import snippetsActionsTypes from './snippets.action-types'
const { FETCH_SNIPPETS_STANDARD, SET_VISIBILITY_TEXT_FILTER } = snippetsActionsTypes
const { COMPLETE_SNIPPET, UPDATE_SNIPPET } = snippetsActionsTypes

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};
/*
 * action creators
 */

export { fetchSnippetsStandard }
export { setVisibilityTextFilter }
export { completeSnippet }
export { thumbUp }
export { thumbDown }
export { updateStar }
export { updateTags }

function fetchSnippetsStandard(payload) {
  return ({ dispatch }) => {
    const action = {
      type: FETCH_SNIPPETS_STANDARD,
      promise: searchByUsername(payload.query),
      payload,
    }

    return dispatch(action)
  }
}

function completeSnippet(payload) {
  return ({ dispatch }) => {
    const { idStr } = payload
    const newPayload = { idStr, updateFields: markAsCompleted(payload) }
    const action = {
      type: COMPLETE_SNIPPET,
      promise: updateSnippet(newPayload),
      payload: newPayload,
    }

    return dispatch(action)
  }
}

function thumbUp(payload) {
  return ({ dispatch }) => {
    const { idStr } = payload
    const newPayload = { idStr, updateFields: setThumbUp(payload) }
    const action = {
      type: UPDATE_SNIPPET,
      promise: updateSnippet(newPayload),
      payload: newPayload,
    }

    return dispatch(action)
  }
}

function thumbDown(payload) {
  return ({ dispatch }) => {
    const { idStr } = payload
    const newPayload = { idStr, updateFields: setThumbDown(payload) }
    const action = {
      type: UPDATE_SNIPPET,
      promise: updateSnippet(newPayload),
      payload: newPayload,
    }

    return dispatch(action)
  }
}

function updateStar(payload) {
  return ({ dispatch }) => {
    const { idStr } = payload
    const newPayload = { idStr, updateFields: setStar(payload) }
    const action = {
      type: UPDATE_SNIPPET,
      promise: updateSnippet(newPayload),
      payload: newPayload,
    }

    return dispatch(action)
  }
}

function updateTags(payload) {
  return ({ dispatch }) => {
    const { idStr } = payload
    const newPayload = { idStr, updateFields: setStar(payload) }
    const action = {
      type: UPDATE_SNIPPET,
      promise: updateSnippet(newPayload),
      payload: newPayload,
    }

    return dispatch(action)
  }
}

function markAsCompleted(snippet) {
  return {
    completed: !snippet.completed,
  }
}

function setThumbUp(snippet) {
  if (snippet.thumbUp) {
    return {
      thumbDown: false,
      thumbUp: false,
    }
  }

  return {
    thumbDown: false,
    thumbUp: true,
  }
}

function setThumbDown(snippet) {
  if (snippet.thumbDown) {
    return {
      thumbDown: false,
      thumbUp: false,
    }
  }

  return {
    thumbDown: true,
    thumbUp: false,
  }
}

function setStar(snippet) {
  return {
    stared: !snippet.stared,
  }
}

function setTags(tags) {
  return {
    tags,
  }
}

/**
 * NOT IN USE??!?!! MAYBE WORTH TO DELTE
 * @param payload
 * @returns {Function}
function fetchDbTweetsSearch(payload) {
  return ({ dispatch }) => {
    const user = payload.user ? payload.user : 'dan_abramov'
    const retweetCount = payload.retweetCount || 10
    const favoriteCount = payload.favoriteCount || 10
    const query = "from:" + user + " min_retweets:" + minRetweets + " OR min_faves:" + minFaves
    //const query = "react%20OR%20reactjs%20from%3Adan_abramov"
    //const query = `from=`${user}&min_retweets=${minRetweets}OR min_faves:" + minFaves
    //  const params = {
    //    from: user,
    //
    //  }
    //
    //  let route  = '/dbTest'
    //route += (params) ? urlEncode(params) : '';
    console.log('query', query)
    console.log('query', JSON.stringify(query))

    //body: JSON.stringify({ ...twitterTokens, query }),
    const action = {
      type: FETCH_SNIPPETS,
      promise: fetch('/dbTest?', {
        queryString: query,
        query: { me: 'example' },
      }),
      payload,
    }
    return dispatch(action)
  }
}
*/

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export function setVisibilityTextFilter(filter) {
  return { type: SET_VISIBILITY_TEXT_FILTER, filter };
}
