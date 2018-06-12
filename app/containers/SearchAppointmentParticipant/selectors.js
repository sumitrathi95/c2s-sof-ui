import { createSelector } from 'reselect';

/**
 * Direct selector to the searchAppointmentParticipant state domain
 */
const selectSearchAppointmentParticipantDomain = (state) => state.get('searchAppointmentParticipant');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchAppointmentParticipant
 */

const makeSelectSearchAppointmentParticipantResults = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState.get('searchParticipantResult').toJS()
);

const makeSelectSelectedAppointmentParticipants = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState && subState.get('selectedParticipants').toJS()
);

export {
  selectSearchAppointmentParticipantDomain,
  makeSelectSearchAppointmentParticipantResults,
  makeSelectSelectedAppointmentParticipants,
};
