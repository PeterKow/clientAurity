import KeyMirror from 'keymirror'

const snippetsActionsTypes = new KeyMirror({
  FETCH_SNIPPETS: null,
  FETCH_SNIPPETS_STARTED: null,
  FETCH_SNIPPETS_SUCCESS: null,
  FETCH_SNIPPETS_FAILED: null,
  FETCH_SNIPPETS_STANDARD: null,
  FETCH_SNIPPETS_STANDARD_STARTED: null,
  FETCH_SNIPPETS_STANDARD_SUCCESS: null,
  FETCH_SNIPPETS_STANDARD_FAILED: null,
  SET_VISIBILITY_TEXT_FILTER: null,
})

Object.freeze(snippetsActionsTypes)

export default snippetsActionsTypes
