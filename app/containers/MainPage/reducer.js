/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_TWITTER_SOURCE,
  SET_DB_SOURCE,
} from './constants';

const initialState = fromJS({
  dataSource: 'DB data',
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DB_SOURCE:
      return state.set('dataSource', 'DB data');
    case SET_TWITTER_SOURCE:
      return state.set('dataSource', 'Twitter');
    default:
      return state;
  }
}

export default mainPageReducer;
