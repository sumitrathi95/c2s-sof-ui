import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';

import { isTokenExpired, retrieveAuthStatus, retrieveToken } from './tokenService';

const ACCESS_SCOPE = 'ocpUi.access';

export function hasAccessScopeInToken(token) {
  let hasAccessScope = false;
  if (!isEmpty(token)) {
    const decodedAccessToken = jwt.decode(token.access_token);
    hasAccessScope = includes(decodedAccessToken.scope, ACCESS_SCOPE);
  }
  return hasAccessScope;
}

export function checkAuthenticated() {
  let isAuthenticated = false;
  const authStatus = retrieveAuthStatus();
  const token = retrieveToken();
  if (authStatus && hasAccessScopeInToken(token) && !isTokenExpired(token)) {
    isAuthenticated = authStatus;
  }
  return isAuthenticated;
}
