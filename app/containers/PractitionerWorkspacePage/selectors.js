import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerWorkspacePage state domain
 */
const selectPractitionerWorkspacePageDomain = (state) => state.get('practitionerWorkspacePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PractitionerWorkspacePage
 */

const makeSelectPractitionerWorkspacePage = () => createSelector(
  selectPractitionerWorkspacePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPractitionerWorkspacePage;
export {
  selectPractitionerWorkspacePageDomain,
};
