
import { fromJS } from 'immutable';
import manageUsersPageReducer from '../reducer';

describe('manageUsersPageReducer', () => {
  it('returns the initial state', () => {
    expect(manageUsersPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
