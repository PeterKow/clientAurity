/*
 * action types
 */
import fetch from 'request'


import snippetsActionsTypes from './snippets.action-types'
const { FETCH_SNIPPETS, FETCH_SNIPPETS_STANDARD } = snippetsActionsTypes

export const COMPLETE_MINI_ARTICLE = 'COMPLETE_MINI_ARTICLE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const FETCH_MINI_ARTICLES = 'FETCH_MINI_ARTICLES';
export const FETCH_MINI_ARTICLES_FAILED = 'FETCH_MINI_ARTICLES_FAILED';
export const FETCH_MINI_ARTICLES_SUCCESS = 'FETCH_MINI_ARTICLES_SUCCESS';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';

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
export { fetchDbTweetsSearch }

function fetchSnippetsStandard(payload) {
  return ({ dispatch }) => {

    // Example query
    // const query = {
    //   userName: 'dan_abramov',
    //   favorite_count: 10,
    //   retweet_count: 10,
    //   page: 10,
    //   limit: 10,
    //   sort: { userName: 1, favorite_count: -1 },
    // }
    const query = {
      limit: 50,
      sort: { favorite_count: 1 },
      ...payload.query,
    }

    const action = {
      type: FETCH_SNIPPETS_STANDARD,
      promise: fetch('/username', {
        query,
      })
        .then(parseResponseFromDbTweet),
      payload,
    }
    return dispatch(action)
  }
}

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

export function completeSnippet(id) {
  return { type: COMPLETE_MINI_ARTICLE, id };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export function fetchMiniArticles(payload) {
  window._source = 'twitter'
  return { type: FETCH_MINI_ARTICLES, payload}
}

export function fetchMiniArticlesSuccess(data) {
  return { type: FETCH_MINI_ARTICLES_SUCCESS, data}
}

export function fetchMiniArticlesFailed(data) {
  return { type: FETCH_MINI_ARTICLES_FAILED, data}
}

export function updateArticleSuccess(payload) {
  return { type: UPDATE_ARTICLE_SUCCESS, payload}
}

function parseResponseFromDbTweet(data) {
  if (data.data) {
    return data.data
  }

  throw { error: "No data" }

}
