import expect from 'expect';
import mainPageReducer from '../reducer';

describe('mainPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      dataSource: 'DB data',
    }
    expect(mainPageReducer(undefined, {}).toJS()).toEqual(initialState);
  });
});
