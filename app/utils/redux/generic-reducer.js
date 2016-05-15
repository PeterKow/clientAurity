import Immutable from 'immutable'

export { createInitStore }
export { genericReducer }
export { getError }

function createInitStore(initStore) {
  if (!initStore) {
    throw new Error('Required initial store for createInitStore')
  }

  return Immutable.fromJS({
    isFetching: false,
    error: false,
    errorMessage: '',
    ...initStore,
  }, createListIfPossible)
}

function genericReducer(state, action) {
  if (!state) {
    throw new Error('state for genericReducer is undefined, please pass defaultState in child' +
      ' reducer')
  }

  if (!action) {
    throw new Error('action for genericReducer is undefined, please pass action from child' +
      ' reducer')
  }

  if (!!regexSTARTED().exec(action.type)) {
    return state
      .merge({
        isFetching: true,
        error: false,
        errorMessage: '',
      })
  } else if (!!regexSUCCESS().exec(action.type)) {
    return state
      .merge({
        isFetching: false,
        error: false,
        errorMessage: '',
      })
  } else if (!!regexERROR().exec(action.type)) {
    return state
      .merge({
        isFetching: false,
        error: true,
        errorMessage: getError(action),
      })
  } else if (!!regexFAILED().exec(action.type)) {
    return state
      .merge({
        isFetching: false,
        error: true,
        errorMessage: getError(action),
      })
  }

  return state
}

function regexSUCCESS() {
  return /_SUCCESS$/gi
}

function regexERROR() {
  return /_ERROR$/gi
}

function regexFAILED() {
  return /_FAILED$/gi
}

function regexSTARTED() {
  return /_STARTED$/gi
}

function getError(action) {
  if (action.error && action.error.message) {
    return action.error.message
  } else if (action.error) {
    return action.error
  }

  return ''
}

function createListIfPossible(key, value) {
  const isIndexed = Immutable.Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
}
