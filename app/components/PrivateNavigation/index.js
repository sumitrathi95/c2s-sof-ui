/**
 *
 * PrivateNavigation
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import ActionHome from '@material-ui/icons/Home';
import ActionBuild from '@material-ui/icons/Build';
import StyledToolbar from 'components/StyledToolbar';
import StyledIconButton from 'components/StyledIconButton';
import {
  ADMIN_MANAGE_PERMISSIONS_URL,
  MANAGE_USERS_URL,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  MANAGE_CLIENT_URL,
} from 'containers/App/constants';
import messages from './messages';
import NavigationButton from './NavigationButton';

function PrivateNavigation(props) {
  const role = props.user.role;
  return (
    <StyledToolbar height="30px">
      <ToolbarGroup firstChild>
        <NavigationButton component={Link} to={props.getLinkUrlByRole(role)}>
          <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
            <ActionHome color="#9cc" />
          </StyledIconButton>
          {<FormattedMessage {...messages.navButton} />}
        </NavigationButton>
        {role === OCP_ADMIN_ROLE_CODE &&
          <NavigationButton component={Link} to={ADMIN_MANAGE_PERMISSIONS_URL}>
            <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
              <ActionBuild color="#9cc" />
            </StyledIconButton>
            {<FormattedMessage {...messages.managePermissionsButton} />}
          </NavigationButton>
        }
        {role === ORGANIZATION_ADMIN_ROLE_CODE &&
        <NavigationButton component={Link} to={MANAGE_USERS_URL}>
          <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
            <ActionBuild color="#9cc" />
          </StyledIconButton>
          {<FormattedMessage {...messages.manageUsersButton} />}
        </NavigationButton>
        }
        {role === OCP_ADMIN_ROLE_CODE &&
        <NavigationButton component={Link} to={MANAGE_CLIENT_URL}>
          <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
            <ActionBuild color="#9cc" />
          </StyledIconButton>
          {<FormattedMessage {...messages.manageSmartApps} />}
        </NavigationButton>
        }
      </ToolbarGroup>
    </StyledToolbar>
  );
}

PrivateNavigation.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  getLinkUrlByRole: PropTypes.func.isRequired,
};

export default PrivateNavigation;
