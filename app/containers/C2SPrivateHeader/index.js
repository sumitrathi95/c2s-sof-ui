/**
 *
 * C2SPrivateHeader
 *
 */

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import common from 'material-ui-next/colors/common';
import isEqual from 'lodash/isEqual';

import { removeToken } from 'utils/tokenService';
import { makeSelectUser } from 'containers/App/contextSelectors';
import StyledToolbar from 'components/StyledToolbar';
import StyledFlatButton from 'components/StyledFlatButton';
import UserAvatar from 'components/UserAvatar';
import StyledImage from 'components/StyledImage';
import c2sBrandImg from 'images/c2s-logo.png';
import HomeButton from './HomeButton';
import messages from './messages';


// Todo: Remove user checking
// Todo: Remove linking to OCP button
function C2SPrivateHeader(props) {
  const { user } = props;
  const ocpLink = isEqual(user.role, 'patientRole') ? '/ocp-ui/patient-workspace' : '/ocp-ui/practitioner-workspace';
  return (
    <div>
      {user ?
        <StyledToolbar color={common.white} height="60px">
          <ToolbarGroup>
            <UserAvatar />
            <ToolbarTitle text={user.user_name} />
          </ToolbarGroup>
          <ToolbarGroup>
            <StyledFlatButton
              component={Link}
              to={ocpLink}
            >
              Link to OCP (DEMO PURPOSE ONLY)
            </StyledFlatButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <StyledImage
              height="35px"
              width="40px"
              src={c2sBrandImg}
              alt={<FormattedMessage {...messages.brandImg} />}
            />
            <HomeButton component={Link} to="/c2s-sof-ui/patient">
              <FormattedMessage {...messages.homeButton} />
            </HomeButton>
          </ToolbarGroup>
        </StyledToolbar> :
        <div>
          {removeToken()}
          <Redirect to="/ocp-ui/login" />
        </div>
      }
    </div>
  );
}

C2SPrivateHeader.propTypes = {
  user: PropTypes.shape({
    user_name: PropTypes.string,
  }),
};


const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(C2SPrivateHeader);
