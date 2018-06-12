import { createSelector } from 'reselect';

/**
 * Direct selector to the permissionAssignments state domain
 */
const selectPermissionAssignmentsDomain = (state) => state.get('permissionAssignments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PermissionAssignments
 */

const makeSelectPermissionAssignments = () => createSelector(
  selectPermissionAssignmentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectPermissionAssignments;
export {
  selectPermissionAssignmentsDomain,
};
