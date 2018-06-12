import { createSelector } from 'reselect';

/**
 * Direct selector to the adminManagePermissionsPage state domain
 */
const selectAdminManagePermissionsPageDomain = (state) => state.get('adminManagePermissionsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AdminManagePermissionsPage
 */

const makeSelectAdminManagePermissionsPage = () => createSelector(
  selectAdminManagePermissionsPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAdminManagePermissionsPage;
export {
  selectAdminManagePermissionsPageDomain,
};
