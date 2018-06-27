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

export {
  selectAttestConsentPageDomain,
  makeSelectGetConsentError,
  makeSelectConsent,
};
