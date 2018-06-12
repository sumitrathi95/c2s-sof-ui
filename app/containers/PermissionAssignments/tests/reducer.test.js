
import { fromJS } from 'immutable';
import permissionAssignmentsReducer from '../reducer';

describe('permissionAssignmentsReducer', () => {
  it('returns the initial state', () => {
    expect(permissionAssignmentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
