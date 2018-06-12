import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerConsents state domain
 */
const selectPractitionerConsentsDomain = (state) => state.get('practitionerConsents');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PractitionerConsents
 */

const makeSelectPractitionerConsents = () => createSelector(
  selectPractitionerConsentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectPractitionerConsents;
export {
  selectPractitionerConsentsDomain,
};
