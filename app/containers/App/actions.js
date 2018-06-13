/*
 *
 * Lookup actions
 *
 */

import { GET_LOOKUPS, GET_LOOKUPS_ERROR, GET_LOOKUPS_FROM_STORE, GET_LOOKUPS_SUCCESS } from './constants';

export function getLookupsAction(lookupTypes) {
  return {
    type: GET_LOOKUPS,
    lookupTypes,
  };
}

export function getLookupsSuccess(lookups) {
  return {
    type: GET_LOOKUPS_SUCCESS,
    lookups,
  };
}

export function getLookupsFromStore() {
  return {
    type: GET_LOOKUPS_FROM_STORE,
  };
}

export function getLookupsError(error) {
  return {
    type: GET_LOOKUPS_ERROR,
    error,
  };
}
