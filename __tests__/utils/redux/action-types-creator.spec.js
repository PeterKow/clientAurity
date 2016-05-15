import { expect } from 'chai'
import actionTypesCreator from '../../src/utils/redux/action-types-creator'
import { generateAsyncActionTypes } from '../../src/utils/redux/action-types-creator'
import { generateSyncActionTypes } from '../../src/utils/redux/action-types-creator'

describe('Action Types Creator module', () => {
  describe('actionTypesCreator', () => {
    const actionTypes = actionTypesCreator({ async: ['hello'], sync: ['world'] })

    it('should be an object', () => {
      expect(actionTypes).to.be.a('object')
    })

    it('should create all action types', () => {
      expect(Object.keys(actionTypes).length).to.equal(6)
    })

    it('action types should be frozen - immutable', () => {
      expect(actionTypes).to.not.be.extensible
    })
  })

  describe('generateAsyncActionTypes', () => {
    const actionTypes = generateAsyncActionTypes(['world', 'TEST'])

    it('should create action types accordingly', () => {
      const expectedActionsTypes = {
        WORLD: 'WORLD',
        WORLD_STARTED: 'WORLD_STARTED',
        WORLD_SUCCESS: 'WORLD_SUCCESS',
        WORLD_FAILED: 'WORLD_FAILED',
        WORLD_ERROR: 'WORLD_ERROR',
        TEST: 'TEST',
        TEST_STARTED: 'TEST_STARTED',
        TEST_SUCCESS: 'TEST_SUCCESS',
        TEST_FAILED: 'TEST_FAILED',
        TEST_ERROR: 'TEST_ERROR',
      }
      expect(actionTypes).to.be.deep.equal(expectedActionsTypes)
    })

    it('action types should be frozen - immutable', () => {
      expect(actionTypes).to.not.be.extensible
    })
  })

  describe('generateSyncActionTypes', () => {
    const actionTypes = generateSyncActionTypes(['world', 'TEST'])

    it('should create action types accordingly', () => {
      const expectedActionsTypes = {
        WORLD: 'WORLD',
        TEST: 'TEST',
      }
      expect(actionTypes).to.be.deep.equal(expectedActionsTypes)
    })

    it('action types should be frozen - immutable', () => {
      expect(actionTypes).to.not.be.extensible
    })
  })
})
