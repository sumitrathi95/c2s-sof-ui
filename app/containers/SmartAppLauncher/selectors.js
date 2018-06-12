import { createSelector } from 'reselect';

/**
 * Direct selector to the smartAppLauncher state domain
 */
const selectSmartAppLauncherDomain = (state) => state.get('smartAppLauncher');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SmartAppLauncher
 */

const makeSelectSmartAppLauncher = () => createSelector(
  selectSmartAppLauncherDomain,
  (substate) => substate.toJS(),
);

const makeSelectSmartApps = () => createSelector(
  selectSmartAppLauncherDomain,
  (substate) => substate.get('clients').toJS(),
);

export default makeSelectSmartAppLauncher;
export {
  selectSmartAppLauncherDomain,
  makeSelectSmartAppLauncher,
  makeSelectSmartApps,
};
