export default function universalMiddleware({ dispatch, getState }) {
  return next => action => {
    if (isFunction(action)) {
      return action({ dispatch, getState })
    } else if (isPromise(action.promise)) {
      next({ type: action.type + '_STARTED', payload: action.payload })
      return action.promise
        .then(
          payload => next({ payload, type: action.type + '_SUCCESS' }),
          error => next({ error: error.error || error, type: action.type + '_FAILED' })
        )
        //.catch(error => {
        //  console.log('quiqup Middleware error, ', error)
        //  next({ error, type: action.type + '_ERROR' })
        //})
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
