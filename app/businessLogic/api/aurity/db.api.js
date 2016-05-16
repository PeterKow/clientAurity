import fetch from 'request'

export { searchByUsername }

/**
 *  Example query
  const query = {
     userName: 'dan_abramov',
     favorite_count: 10,
     retweet_count: 10,
     page: 10,
     limit: 10,
     sort: { userName: 1, favorite_count: -1 },
   }
 * @param query
 * @returns { promise }
 */
function searchByUsername(queryParams) {
  const query = {
    limit: 50,
    sort: { favorite_count: 1 },
    ...queryParams,
  }

  return fetch('/username', { query })
    .then(parseResponseFromDbTweet)
}

function parseResponseFromDbTweet(data) {
  if (data.data && data.data.data && data.data.data.length !== 0) {
    return data.data
  }

  console.log('throw')

  throw new Error('No data')
}
