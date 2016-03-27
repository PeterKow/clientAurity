/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import globalReducer from 'App/reducer';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { visibilityFilter, snippetReducer } from 'businessLogic/snippets/snippets.reducers'
import user from 'businessLogic/user/user.reducers.js'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    visibilityFilter,
    snippetReducer,
    user,
    global: globalReducer,
    ...asyncReducers,
  });
}
