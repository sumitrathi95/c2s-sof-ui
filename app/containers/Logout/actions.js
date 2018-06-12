/*
 *
 * Logout actions
 *
 */

import { LOGOUT } from './constants';

export function logout(config) {
  return {
    type: LOGOUT,
    config,
  };
}
