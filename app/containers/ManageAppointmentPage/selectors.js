import { createSelector } from 'reselect';

/**
 * Direct selector to the manageAppointmentPage state domain
 */
const selectManageAppointmentPageDomain = (state) => state.get('manageAppointmentPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageAppointmentPage
 */

const makeSelectManageAppointmentPage = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.toJS()
);

const makeSelectAppointment = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('appointment'),
);

export {
  selectManageAppointmentPageDomain,
  makeSelectManageAppointmentPage,
  makeSelectAppointment,
};
