/**
 *
 * Logout
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { MenuItem } from 'material-ui-next/Menu';

import injectSaga from 'utils/injectSaga';
import { clearAll } from 'containers/App/contextActions';
import { makeSelectConfig } from 'containers/App/selectors';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { CARE_COORDINATOR_ROLE_CODE, PATIENT_ROLE_CODE } from 'containers/App/constants';
import { logout } from './actions';
import saga from './saga';
import messages from './messages';

export class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout(this.props.config);
  }

  render() {
    const { patient } = this.props;
    return (
      <div>
        {patient &&
        <ShowHideWrapper allowedRoles={[PATIENT_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE]}>
          <MenuItem component={Link} to="/c2s-sof-ui/patient">
            Link to C2S Smart
          </MenuItem>
        </ShowHideWrapper>
        }
        <MenuItem onClick={this.handleLogout}>
          <FormattedMessage {...messages.logoutButton} />
        </MenuItem>
      </div>
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  config: PropTypes.object,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  config: makeSelectConfig(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (config) => {
      dispatch(logout(config));
      dispatch(clearAll());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
)(Logout);
