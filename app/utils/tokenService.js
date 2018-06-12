import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';

const AUTH_TOKEN = 'auth_token';
const AUTH_STATUS = 'isAuthenticated';

const OUTLOOK_EMAIL = 'outlook_email';
const OUTLOOK_PASSWORD = 'outlook_password';

export function storeToken(tokenObj) {
  sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(tokenObj));
}

export function retrieveToken() {
  return JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
}

export function storeAuthStatus(isAuthenticated) {
  sessionStorage.setItem(AUTH_STATUS, isAuthenticated);
}

export function retrieveAuthStatus() {
  return JSON.parse(sessionStorage.getItem(AUTH_STATUS));
}

export function removeToken() {
  sessionStorage.removeItem(AUTH_TOKEN);
  sessionStorage.removeItem(AUTH_STATUS);

  sessionStorage.removeItem(OUTLOOK_EMAIL);
  sessionStorage.removeItem(OUTLOOK_PASSWORD);
}

export function storeOutlookUsername(username) {
  sessionStorage.setItem(OUTLOOK_EMAIL, username);
}

export function storeOutlookPassword(password) {
  sessionStorage.setItem(OUTLOOK_PASSWORD, password);
}

export function retrieveOutlookUsername() {
  if (sessionStorage.getItem(OUTLOOK_EMAIL) !== null) {
    const userName = JSON.stringify(sessionStorage.getItem(OUTLOOK_EMAIL));
    return JSON.parse(userName);
  }
  return null;
}

export function retrieveOutlookPassword() {
  if (sessionStorage.getItem(OUTLOOK_PASSWORD) !== null) {
    const password = JSON.stringify(sessionStorage.getItem(OUTLOOK_PASSWORD));
    return JSON.parse(password);
  }
  return null;
}

export function isTokenExpired(token) {
  if (!isEmpty(token)) {
    const currentTime = new Date().getTime() / 1000;
    const decodedAccessToken = jwt.decode(token.access_token);
    return currentTime > decodedAccessToken.exp;
  }
  return true;
}
