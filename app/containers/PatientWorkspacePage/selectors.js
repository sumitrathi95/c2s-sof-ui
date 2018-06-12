import { createSelector } from 'reselect';

/**
 * Direct selector to the patientWorkspacePage state domain
 */
const selectPatientWorkspacePageDomain = (state) => state.get('patientWorkspacePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientWorkspacePage
 */

const makeSelectPatientWorkspacePage = () => createSelector(
  selectPatientWorkspacePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPatientWorkspacePage;
export {
  selectPatientWorkspacePageDomain,
};
