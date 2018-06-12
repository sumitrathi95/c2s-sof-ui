import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Menu, { MenuItem } from 'material-ui-next/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import ShowHideWrapper from 'containers/ShowHideWrapper';
import Util from 'utils/Util';
import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';

const CONSENT_STATUS_DRAFT = 'DRAFT';

class ConsentNavigationIconMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleOpenIconMenu = this.handleOpenIconMenu.bind(this);
    this.handleCloseIconMenu = this.handleCloseIconMenu.bind(this);
  }

  handleOpenIconMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseIconMenu() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { consent, allowedAttestConsentRoles } = this.props;
    const { logicalId, status } = consent;
    const { anchorEl } = this.state;
    return (
      <div>
        <StyledIconButton onClick={this.handleOpenIconMenu}>
          <MoreHorizIcon />
        </StyledIconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseIconMenu}
        >
          <MenuItem
            onClick={this.handleCloseIconMenu}
            component={Link}
            to={`/ocp-ui/manage-consent/${logicalId}`}
          >
            <FormattedMessage {...messages.edit} />
          </MenuItem>
          {
            Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
            <ShowHideWrapper allowedRoles={allowedAttestConsentRoles}>
              <MenuItem
                component={Link}
                to={`/ocp-ui/sign-consent/${logicalId}`}
                onClick={this.handleCloseIconMenu}
              >
                <FormattedMessage {...messages.attest} />
              </MenuItem>
            </ShowHideWrapper>
          }
          <MenuItem
            onClick={this.handleCloseIconMenu}
            disabled
          >
            <FormattedMessage {...messages.remove} />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ConsentNavigationIconMenu.propTypes = {
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  allowedAttestConsentRoles: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ),
  ]).isRequired,
};

export default ConsentNavigationIconMenu;

