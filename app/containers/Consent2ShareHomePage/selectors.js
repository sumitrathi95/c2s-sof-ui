import { createSelector } from 'reselect';

/**
 * Direct selector to the consent2ShareHomePage state domain
 */
const selectConsent2ShareHomePageDomain = (state) => state.get('consent2ShareHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Consent2ShareHomePage
 */

const makeSelectConsent2ShareHomePage = () => createSelector(
  selectConsent2ShareHomePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectConsent2ShareHomePage;
export {
  selectConsent2ShareHomePageDomain,
};
