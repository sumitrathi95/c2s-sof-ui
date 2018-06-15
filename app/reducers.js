/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import contextReducer from 'containers/App/contextReducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { LOGOUT } from 'containers/Logout/constants';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 * Will reset entirely the redux state when receives logout action
 */
// TODO: Might keep some unsecured cache data like lookup based on required
export default function createReducer(injectedReducers) {
  return (state, action) => combineReducers({
    global: globalReducer,
    context: contextReducer,
    route: routeReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  })(action.type === LOGOUT ? undefined : state, action);
}
