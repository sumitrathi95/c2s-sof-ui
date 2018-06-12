
import { fromJS } from 'immutable';
import adminManagePermissionsPageReducer from '../reducer';

describe('adminManagePermissionsPageReducer', () => {
  it('returns the initial state', () => {
    expect(adminManagePermissionsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
