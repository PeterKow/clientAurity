/*
 *
 * MainPage actions
 *
 */

import {
  SET_TWITTER_SOURCE,
  SET_DB_SOURCE,
} from './constants';

export { setTwitterSource }
export { setDbSource }

function setTwitterSource() {
  return {
    type: SET_TWITTER_SOURCE,
  };
}

function setDbSource() {
  return {
    type: SET_DB_SOURCE,
  };
}
