import expect from 'expect';
import snippetPageReducer from '../reducer';

describe('snippetPageReducer', () => {
  it('returns the initial state', () => {
    expect(snippetPageReducer(undefined, {})).toEqual({});
  });
});
