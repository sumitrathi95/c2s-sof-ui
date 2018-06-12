/*
 *
 * SmartAppLauncher actions
 *
 */

import {
  GET_CLIENTS,
  GET_CLIENTS_ERROR,
  GET_CLIENTS_SUCCESS,
  CREATE_LAUNCH,
  CREATE_LAUNCH_ERROR,
  CREATE_LAUNCH_SUCCESS,
} from './constants';

export function getClients() {
  return {
    type: GET_CLIENTS,
  };
}

export function getClientsSuccess(clients) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients,
  };
}

export function getClientsError(error) {
  return {
    type: GET_CLIENTS_ERROR,
    error,
  };
}

export function createLaunch(clientId) {
  return {
    type: CREATE_LAUNCH,
    clientId,
  };
}

export function createLaunchSuccess(launch) {
  return {
    type: CREATE_LAUNCH_SUCCESS,
    launch,
  };
}

export function createLaunchError(error) {
  return {
    type: CREATE_LAUNCH_ERROR,
    error,
  };
}
