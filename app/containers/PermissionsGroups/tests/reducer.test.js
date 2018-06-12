
import { fromJS } from 'immutable';
import permissionsGroupsReducer from '../reducer';

describe('permissionsGroupsReducer', () => {
  it('returns the initial state', () => {
    expect(permissionsGroupsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
