const STATE_KEY = 'c2s.state';
const makeAuthorizeKey = (state) => `${STATE_KEY}.${state}.authorize`;
const makeTokenKey = (state) => `${STATE_KEY}.${state}.token`;

export default class LaunchService {
  static clear() {
    sessionStorage.clear();
  }

  static saveLaunchState(state, authorize, token) {
    sessionStorage.setItem(STATE_KEY, state);
    sessionStorage.setItem(makeAuthorizeKey(state), authorize);
    sessionStorage.setItem(makeTokenKey(state), token);
  }

  static verifyLaunchState(state) {
    return sessionStorage.getItem(STATE_KEY) === state;
  }

  static getLaunchState(state) {
    if (this.verifyLaunchState(state)) {
      const authorize = sessionStorage.getItem(makeAuthorizeKey(state));
      const token = sessionStorage.getItem(makeTokenKey(state));
      return {
        state,
        authorize,
        token,
      };
    }
    return null;
  }
}
