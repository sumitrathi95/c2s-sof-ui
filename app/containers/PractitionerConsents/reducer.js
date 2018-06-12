/*
 *
 * PractitionerConsents reducer
 *
 */

import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import {
GET_CONSENTS, GET_CONSENTS_ERROR, GET_CONSENTS_SUCCESS,
INITIALIZE_CONSENTS,
} from './constants';

const initialState = fromJS({
  listConsents: {
    loading: false,
    data: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
});

function practitionerConsentsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_CONSENTS: {
      if (!isEmpty(action.consents)) {
        return initialState
          .setIn(['listConsents', 'data'], fromJS(action.consents));
      }
      return initialState;
    }
    case GET_CONSENTS:
      return state
        .setIn(['listConsents', 'loading'], true);
    case GET_CONSENTS_SUCCESS:
      return state
        .setIn(['listConsents', 'loading'], false)
        .setIn(['listConsents', 'data'], fromJS(action.consents.elements))
        .setIn(['listConsents', 'totalNumberOfPages'], action.consents.totalNumberOfPages)
        .setIn(['listConsents', 'totalElements'], action.consents.totalElements)
        .setIn(['listConsents', 'currentPageSize'], action.consents.currentPageSize)
        .setIn(['listConsents', 'currentPage'], action.consents.currentPage);
    case GET_CONSENTS_ERROR:
      return state
        .setIn(['listConsents', 'loading'], false)
        .setIn(['listConsents', 'data'], fromJS([]))
        .setIn(['listConsents', 'error'], action.error);
    default:
      return state;
  }
}

export default practitionerConsentsReducer;
