import { fromJS } from 'immutable'
export { mapSnippet }

function mapSnippet(data = {}) {
  return fromJS({
    id: data.id,
    idStr: data.id_str,
    text: expandUrls(data.text, data.entities.urls),
    completed: data.completed || false,
    stared: data.stared || false,
    thumbDown: data.thumbDown || false,
    thumbUp: data.thumbUp || false,
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
  })
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
