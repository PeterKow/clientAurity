import generateActionTypes from 'utils/redux/action-types-creator'

const snippetsActionsTypes = generateActionTypes({
  sync: ['SET_VISIBILITY_TEXT_FILTER'],
  async: [
    'FETCH_SNIPPETS',
    'FETCH_SNIPPETS_STANDARD',
    'COMPLETE_SNIPPET',
    'UPDATE_SNIPPET',
  ],
})

Object.freeze(snippetsActionsTypes)

export default snippetsActionsTypes
