
import { fromJS } from 'immutable';
import consent2ShareHomePageReducer from '../reducer';

describe('consent2ShareHomePageReducer', () => {
  it('returns the initial state', () => {
    expect(consent2ShareHomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
