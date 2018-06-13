
import { fromJS } from 'immutable';
import contextReducer from '../reducer';

describe('contextReducer', () => {
  it('returns the initial state', () => {
    expect(contextReducer(undefined, {})).toEqual(fromJS({
      user: null,
      patient: null,
      organization: null,
    }));
  });
});
