import expect from 'expect'
import {
  setTwitterSource,
  setDbSource,
} from '../actions'
import {
  SET_TWITTER_SOURCE,
  SET_DB_SOURCE,
} from '../constants'

describe('MainPage actions', () => {
  describe('setTwitterSource Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: SET_TWITTER_SOURCE,
      }
      expect(setTwitterSource()).toEqual(expected);
    })
  })

  describe('setDbSource Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: SET_DB_SOURCE,
      }
      expect(setDbSource()).toEqual(expected);
    })
  })
})
