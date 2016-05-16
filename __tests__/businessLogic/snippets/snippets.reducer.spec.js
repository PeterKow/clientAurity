import { expect } from 'chai'
import { createInitStore } from '../../src/utils/redux/generic.reducer'
import highOrderPrinterReducer, { createInitialState }
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
    const someTes = getDirtyInitialState()
    const initialState = createInitialState(someTes)
    expect(initialState).to.deep.equal(expectedState)
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
