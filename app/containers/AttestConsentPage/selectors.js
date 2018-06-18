import { createSelector } from 'reselect';

/**
 * Direct selector to the attestConsentPage state domain
 */
const selectAttestConsentPageDomain = (state) => state.get('attestConsentPage');


const makeSelectGetConsentError = () => createSelector(
  selectAttestConsentPageDomain,
  (subState) => subState.get('error'),
);

const makeSelectConsent = () => createSelector(
  selectAttestConsentPageDomain,
  (subState) => subState && subState.get('consent'),
);

const makeSelectIsAuthenticated = () => createSelector(
  selectAttestConsentPageDomain,
  (subState) => subState && subState.get('isAuthenticated'),
);

export {
  selectAttestConsentPageDomain,
  makeSelectGetConsentError,
  makeSelectConsent,
  makeSelectIsAuthenticated,
};
