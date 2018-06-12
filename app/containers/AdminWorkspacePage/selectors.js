import { createSelector } from 'reselect';

/**
 * Direct selector to the adminWorkspacePage state domain
 */
const selectAdminWorkspacePageDomain = (state) => state.get('adminWorkspacePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AdminWorkspacePage
 */

const makeSelectAdminWorkspacePage = () => createSelector(
  selectAdminWorkspacePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAdminWorkspacePage;
export {
  selectAdminWorkspacePageDomain,
};
