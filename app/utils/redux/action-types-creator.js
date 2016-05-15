export default generateActionTypes

export { generateAsyncActionTypes }
export { generateSyncActionTypes }

function generateActionTypes({ sync = [], async = [] }) {
  const asyncActionTypes = generateAsyncActionTypes(async)
  const syncActionTypes = generateSyncActionTypes(sync)

  return Object.freeze({ ...asyncActionTypes, ...syncActionTypes })
}

function generateSyncActionTypes(actionTypes = []) {
  const actions = {}

  actionTypes.forEach((key) => {
    const normalisedKey = key.toUpperCase()
    actions[normalisedKey] = normalisedKey
  })

  return Object.freeze(actions)
}

function generateAsyncActionTypes(actionTypes = []) {
  const actions = {}

  actionTypes.forEach((key) => {
    const normalisedKey = key.toUpperCase()
    actions[normalisedKey] = normalisedKey
    actions[`${normalisedKey}_STARTED`] = `${normalisedKey}_STARTED`
    actions[`${normalisedKey}_SUCCESS`] = `${normalisedKey}_SUCCESS`
    actions[`${normalisedKey}_FAILED`] = `${normalisedKey}_FAILED`
    actions[`${normalisedKey}_ERROR`] = `${normalisedKey}_ERROR`
  })

  return Object.freeze(actions)
}
