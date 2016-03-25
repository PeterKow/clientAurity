import KeyMirror from 'keymirror'

const dbTweets = new KeyMirror({
  FETCH_TEST: null,
  FETCH_TEST_STARTED: null,
  FETCH_TEST_SUCCESS: null,
  FETCH_TEST_FAILED: null,
})

Object.freeze(dbTweets)

export default dbTweets
