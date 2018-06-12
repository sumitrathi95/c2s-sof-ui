/**
 *
 * PrivateHeader
 *
 */

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import common from 'material-ui-next/colors/common';

import { removeToken } from 'utils/tokenService';
import StyledToolbar from 'components/StyledToolbar';
import UserAvatar from 'components/UserAvatar';
import StyledImage from 'components/StyledImage';
import c2sBrandImg from 'images/c2s-logo.png';
import HomeButton from './HomeButton';
import messages from './messages';

function PrivateHeader() {
  // Todo: Get user from context
  const user = {
    user_name: 'Sally Share',
  };
  return (
    <div>
      {user ?
        <StyledToolbar color={common.white} height="60px">
          <ToolbarGroup>
            <UserAvatar />
            <ToolbarTitle text={user.user_name} />
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

PrivateHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(PrivateHeader);
