/*
 *
 * MainPage actions
 *
 */

import {
  SET_TWITTER_SOURCE,
  SET_DB_SOURCE,
} from './constants';

export function setTwitterSource() {
  return {
    type: SET_TWITTER_SOURCE,
  };
}

export function setDbSource() {
  return {
    type: SET_DB_SOURCE,
  };
}
