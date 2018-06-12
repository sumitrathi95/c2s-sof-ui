/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import Login from 'components/Login';
import saga from './saga';
import { login } from './actions';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loginFormData, actions) {
    this.props.onRequestLogin(loginFormData, () => actions.setSubmitting(false));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Login page of Omnibus Care Plan application" />
        </Helmet>
        <div>
          <Login onLogin={this.handleLogin} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onRequestLogin: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onRequestLogin: (loginFormData, handleSubmitting) => dispatch(login(loginFormData, handleSubmitting)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
