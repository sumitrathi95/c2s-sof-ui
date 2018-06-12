/*
 *
 * RelatedPersons reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_RELATED_PERSONS,
  GET_RELATED_PERSONS_SUCCESS, INITIALIZE_RELATED_PERSONS,
} from './constants';

const initialState = fromJS({
  data: {},
  loading: false,
});

function relatedPersonsReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_RELATED_PERSONS:
      return initialState;
    case GET_RELATED_PERSONS:
      return state.set('loading', true);
    case GET_RELATED_PERSONS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn(['relatedPersons', 'totalElements'], action.relatedPersons.totalNumberOfPages)
        .set('data', fromJS((action.relatedPersons) || {}));
    default:
      return state;
  }
}

export default relatedPersonsReducer;
