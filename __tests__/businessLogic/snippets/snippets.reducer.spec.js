import { expect } from 'chai'
import { createInitStore } from '../../src/utils/redux/generic.reducer'
import highOrderPrinterReducer, { createInitialState, printerReducer }
  from '../../src/printer/printer.reducer'

describe('Printer reducer', () => {
  describe('should have highOrderPrinterReducer and', () => {
    it('should return state with get and toJS methods', () => {
      expect(highOrderPrinterReducer(undefined, {}).get).to.exist
      expect(highOrderPrinterReducer(undefined, {}).toJS).to.exist
    })
  })

  it('createInitialState should return have initial state equal to', () => {
    const expectedState = getInitialState()
    const initialState = createInitialState()
    expect(initialState).to.deep.equal(expectedState)
  })

  describe('should have printerReducer and', () => {
    it('SEARCH_FOR_PRINTER_STARTED action should set following', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Searching...'
      expectedState.statusCode = 'orange'
      expectedState.printerAddress = ''
      expectedState.error = false
      expectedState.errorMessage = ''
      const action = { type: 'SEARCH_FOR_PRINTER_STARTED' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('SEARCH_FOR_PRINTER_SUCCESS action should set "status", "statusCode" and' +
      ' remove "printerAddress"', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Found printer'
      expectedState.statusCode = 'orange'
      expectedState.printerAddress = 'Address'
      const action = { type: 'SEARCH_FOR_PRINTER_SUCCESS', payload: { printerAddress: 'Address' } }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('CONNECT_TO_PRINTER_STARTED action should set "status" and "statusCode"', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Connecting...'
      expectedState.statusCode = 'orange'
      const action = { type: 'CONNECT_TO_PRINTER_STARTED' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('CONNECT_TO_PRINTER_SUCCESS action should set following', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Ready'
      expectedState.statusCode = 'green'
      expectedState.error = false
      expectedState.errorMessage = ''
      expectedState.failedAttempts = 0
      const action = { type: 'CONNECT_TO_PRINTER_SUCCESS' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('CONNECT_TO_PRINTER_ERROR action should set following', () => {
      const initialState = getDirtyInitialState().set('failedAttempts', 2)
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Failed to connect'
      expectedState.statusCode = 'red'
      expectedState.failedAttempts = 3

      const action = { type: 'CONNECT_TO_PRINTER_ERROR' }
      const newState = printerReducer(initialState, action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('CONNECT_TO_PRINTER_FAILED action should set following', () => {
      const initialState = getDirtyInitialState().set('failedAttempts', 0)
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Failed to connect'
      expectedState.statusCode = 'red'
      expectedState.failedAttempts = 1

      const action = { type: 'CONNECT_TO_PRINTER_FAILED' }
      const newState = printerReducer(initialState, action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('NO_BLUETOOTH action should set "status" and "statusCode"', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Bluetooth off'
      expectedState.statusCode = 'red'
      const action = { type: 'NO_BLUETOOTH' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('PRINTER_DISABLED action should set following', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'No printer'
      expectedState.statusCode = 'red'
      expectedState.printerEnabled = false
      const action = { type: 'PRINTER_DISABLED' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('PRINTER_ENABLED action should set following', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.printerEnabled = true
      const action = { type: 'PRINTER_ENABLED' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })

    it('PRINTING_STARTED action should set "status" and "statusCode"', () => {
      const expectedState = getDirtyInitialState().toJS()
      expectedState.status = 'Printing...'
      expectedState.statusCode = 'orange'
      const action = { type: 'PRINTING_STARTED' }
      const newState = printerReducer(getDirtyInitialState(), action).toJS()
      expect(newState).to.be.deep.equal(expectedState)
    })
  })
})

function getInitialState() {
  return {
    status: 'No printer',
    printerAddress: '',
    autoConnect: false,
    statusCode: 'red',
    printerEnabled: false,
    failedAttempts: 0,
  }
}

function getDirtyInitialState() {
  return createInitStore({
    status: { me: 'again' },
    statusCode: { not: 'really status' },
    printerAddress: 12122,
    printerEnabled: 'joke',
    failedAttempts: 34234,
    dirtyData: 'mmeee',
  })
}
