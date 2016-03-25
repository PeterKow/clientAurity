import expect from 'expect';
import mainPageReducer from '../reducer';

describe('mainPageReducer', () => {
  it('returns the initial state', () => {
    expect(mainPageReducer(undefined, {})).toEqual({});
  });
});
