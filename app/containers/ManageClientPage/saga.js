// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { getClients } from 'containers/SmartAppLauncher/api';
import { saveClientError, saveClientSuccess, getClientsSuccess, getClientsError, deleteClientSuccess, deleteClientError } from './actions';
import { saveClient, deleteClient, mapToClientMetaDto } from './api';
import { GET_CLIENTS, SAVE_CLIENT, DELETE_CLIENT } from './constants';

export function* saveClientSaga(action) {
  try {
    yield call(saveClient, action.clientFormData);
    const clientMetaDto = yield call(mapToClientMetaDto, action.clientFormData);
    yield put(showNotification(`Successfully ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
    yield put(saveClientSuccess(clientMetaDto));
  } catch (error) {
    yield put(saveClientError(error));
    yield put(showNotification(`Failed to ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
  }
}

export function* getClientsSaga() {
  try {
    const clients = yield call(getClients);
    yield put(getClientsSuccess(clients));
  } catch (error) {
    yield put(getClientsError(error));
    yield put(showNotification('Failed to retrieve SMART Apps.'));
  }
}

export function* deleteClientsSaga(action) {
  try {
    yield call(deleteClient, action.clientId);
    yield put(deleteClientSuccess(action.clientId));
    yield put(showNotification('Successfully delete SMART App.'));
  } catch (error) {
    yield put(showNotification('Failed to delete SMART Apps.'));
    yield put(deleteClientError(error));
  }
}

function getNotificationAction(clientFormData) {
  let action = 'create';
  if (clientFormData.isEdit) {
    action = 'edit';
  }
  return action;
}

export function* watchSaveClientSaga() {
  yield [
    takeLatest(SAVE_CLIENT, saveClientSaga),
  ];
}

export function* watchGetClientsSaga() {
  yield takeLatest(GET_CLIENTS, getClientsSaga);
}

export function* watchDeleteClientSaga() {
  yield takeLatest(DELETE_CLIENT, deleteClientsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetClientsSaga(),
    watchSaveClientSaga(),
    watchDeleteClientSaga(),
  ]);
}
