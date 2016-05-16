import { expect } from 'chai'
import Immutable from 'immutable'
import { createInitStore, genericReducer, getError } from '../../src/utils/redux/generic.reducer'

describe('Generic reducer module', () => {
  describe('createInitStore', () => {
    it('should create initial store matching model', () => {
      const store = {
        my: 'data',
        hello: 1,
      }
      const initialStore = createInitStore(store)
      const expectedStore = {
        isFetching: false,
        error: false,
        errorMessage: '',
        ...store,
      }
      expect(initialStore.toJS).to.exist
      expect(expectedStore).to.deep.equal(initialStore.toJS())
    })

    it('should throw exception when no initialState passed', () => {
      const error = 'Required initial store for createInitStore'
      expect(createInitStore).to.throw(error)
    })
  })

  describe('genericReducer', () => {
    it('should throw exception when no state passed', () => {
      const error = 'state for genericReducer is undefined, please pass defaultState in' +
      ' child reducer'
      expect(() => genericReducer(null, null)).to.throw(error)
    })

    it('should throw exception when no action passed', () => {
      const error = 'action for genericReducer is undefined, please pass action from ' +
        'child reducer'
      expect(() => genericReducer({}, null)).to.throw(error)
    })

    describe('should handle following actions', () => {
      it('generic action doesn\'t change state', () => {
        const state = getDirtyState()
        const newState = genericReducer(state, { type: 'SOME_ACTION_NAME' }).toJS()
        expect(newState).to.deep.equal(state.toJS())
      })

      it('all actions ending with "_SUCCESS" ', () => {
        const action = {
          type: 'SOME_ACTION_SUCCESS',
        }
        const state = getDirtyState()
        const expectedState = {
          ...state.toJS(),
          isFetching: false,
          error: false,
          errorMessage: '',
        }
        const newState = genericReducer(state, action).toJS()
        expect(newState).to.deep.equal(expectedState)
      })

      it('all actions ending with "_STARTED" ', () => {
        const action = {
          type: 'SOME_ACTION_STARTED',
        }
        const state = getDirtyState()
        const expectedState = {
          ...state.toJS(),
          isFetching: true,
          error: false,
          errorMessage: '',
        }
        const newState = genericReducer(state, action).toJS()
        expect(newState).to.deep.equal(expectedState)
      })

      it('all actions ending with "_ERROR" ', () => {
        const action = {
          type: 'SOME_ACTION_ERROR',
          payload: {
            error: {
              message: 'my error',
            },
          },
        }
        const state = getDirtyState()
        const expectedState = {
          ...state.toJS(),
          isFetching: false,
          error: true,
          errorMessage: 'my error',
        }
        const newState = genericReducer(state, action).toJS()
        expect(newState).to.deep.equal(expectedState)
      })

      it('all actions ending with "_FAILED" ', () => {
        const action = {
          type: 'SOME_ACTION__FAILED',
          payload: {
            error: {
              message: 'my error',
            },
          },
        }
        const state = getDirtyState()
        const expectedState = {
          ...state.toJS(),
          isFetching: false,
          error: true,
          errorMessage: 'my error',
        }
        const newState = genericReducer(state, action).toJS()
        expect(newState).to.deep.equal(expectedState)
      })
    })
  })

  describe('getError', () => {
    it('should get error message', () => {
      const action = {
        payload: {
          error: {
            message: 'my error',
          },
        },
      }
      expect(getError(action)).to.equal('my error')
    })

    it('should get error as fallback', () => {
      const action = {
        payload: {
          error: 'my error',
        },
      }
      expect(getError(action)).to.equal('my error')
    })

    it('should return empty string in case no errro message', () => {
      const action = {}
      expect(getError(action)).to.equal('')
    })
  })
})

function getDirtyState() {
  return Immutable.fromJS({
    isFetching: 'not true',
    error: 'good point',
    errorMessage: { hello: 122 },
    my: 'data',
    hello: 1,
  })
}
