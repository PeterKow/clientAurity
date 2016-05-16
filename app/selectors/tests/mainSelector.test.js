import mainSelector from '../mainSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('mainSelector', () => {
  it('should select the main state', () => {
    const mainState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      main: mainState,
    });
    expect(mainSelector(mockedState)).toEqual(mainState);
  });
});
