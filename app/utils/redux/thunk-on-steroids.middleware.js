export default function thunkOnSteroidsMiddleware({ dispatch, getState }) {
  return next => action => {
    if (isFunction(action)) {
      return action({ dispatch, getState })
    } else if (isPromise(action.promise)) {
      next({ type: `${action.type}_STARTED`, payload: action.payload })
      return action.promise
        .then(
          payload => {
            const newPayload = {
              payload,
              type: `${action.type}_SUCCESS`,
              startedPayload: action.payload,
            }
            next(newPayload)

            return newPayload
          },

          error => {
            const newPayload = {
              error,
              type: `${action.type}_FAILED`,
              startedPayload: action.payload,
            }
            next(newPayload)

            return newPayload
          })
        .catch(error => {
          console.error('Middleware error, ', error)
          next({ error, type: `${action.type}_ERROR` })
          throw error;
        })
    }

    return next(action)
  }
}

function isPromise(action) {
  return action && typeof action.then === 'function';
}

function isFunction(action) {
  return typeof action === 'function'
}
