import { fetchMiniArticles, fetchMiniArticlesSuccess, fetchMiniArticlesFailed }
  from './snippets.actions.js'
import { unauthorised } from 'businessLogic/user/user.group.actions'
import fetch from 'request'
import auth from 'utils/auth'

export function startFetchMiniArticles(payload = {}) {
  return dispatch => {
    dispatch(fetchMiniArticles(payload))

    // const from:dan_abramov
    // const user = payload.search ? payload.search : 'dan_abramov'
    // const minRetweets = payload.min_retweets
    // const minFaves = payload.min_faves
    const query = 'check this please here!!'

    // const query = "from:" + user + " min_retweets:" + minRetweets + " OR min_faves:" + minFaves
    console.log('query', query)
    return sendRequest(dispatch, query)
  }
}

export function startFetchMiniArticlesReply() {
  return dispatch => {
    dispatch(fetchMiniArticles())

    // const from:dan_abramov
    // const minRetweets = 10
    // const minFaves = 10
    // const query = "from:dan_abramov min_retweets:" + minRetweets + " OR min_faves:" + minFaves

    const query = 'check this please here!!'
    return sendRequest(dispatch, query)
  }
}

function mapTwitterResponse(data) {
  // console.log('data', data.entities)
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

function expandUrls(text, urls) {
  let newText = text
  urls.forEach(url => {
    newText = newText.replace(url.url, url.expanded_url)
  })
  return newText
}

function sendRequest(dispatch, query) {
  const twitterTokens = auth.getTwitterTokens()
  if (!twitterTokens) {
    return dispatch(unauthorised('notTokensOnTheClient'))
  }

  return fetch('/search/twitter', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...twitterTokens, query }),
  })
    .then(res => {
      const data = res.message.statuses.map(mapTwitterResponse)

      // console.log('daaaa', data[0].user.id)
      dispatch(fetchMiniArticlesSuccess(data))
    })
    .catch(res => {
      dispatch(fetchMiniArticlesFailed(res))
    })
}
