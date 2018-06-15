/**
 *
 * Logout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import { MenuItem } from 'material-ui-next/Menu';
import { logout } from './actions';
import saga from './saga';
import messages from './messages';

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout();
  }

  render() {
    return (
      <MenuItem onClick={this.handleLogout}>
        <FormattedMessage {...messages.logoutMenuItem} />
      </MenuItem>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
)(Logout);
