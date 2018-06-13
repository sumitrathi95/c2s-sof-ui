/**
 *
 * Authentication
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import { isTokenExpired, removeToken, retrieveToken } from 'utils/tokenService';
import makeSelectAuth from 'containers/App/authSelectors';
import { LOGIN_URL } from 'containers/App/constants';
import { makeSelectUser } from 'containers/Context/selectors';
import saga from './saga';

export function Authentication(props) {
  let isAuthenticated = props.auth.isAuthenticated;
  if (isTokenExpired(retrieveToken())) {
    isAuthenticated = false;
    removeToken();
  }
  const { user, location } = props;
  return (
    isAuthenticated && user ?
      // child component will be rendered here
      <div>{props.children}</div> :
      <div>
        {removeToken()}
        <Redirect
          to={{
            pathname: LOGIN_URL,
            state: { from: location },
          }}
        />
      </div>
  );
}

Authentication.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }),
  user: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

const withSaga = injectSaga({ key: 'authentication', saga });

export default compose(
  withConnect,
  withSaga,
)(Authentication);
