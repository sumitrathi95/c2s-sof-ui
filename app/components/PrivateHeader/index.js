/**
 *
 * PrivateHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import AccountBox from '@material-ui/icons/AccountBox';
import Notifications from '@material-ui/icons/Notifications';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Logout from 'containers/Logout';
import StyledImage from 'components/StyledImage';
import StyledToolbar from 'components/StyledToolbar';
import brandImg from 'images/omnibus-care-plan-logo.png';
import messages from './messages';


class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  getUserProfileName() {
    return this.props.user && (this.props.user.name ? this.props.user.name : this.props.user.user_name);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <StyledToolbar
        color="#ffffff"
        height="35px"
      >
        <ToolbarGroup firstChild>
          <StyledImage height="30px" width="40px" src={brandImg} alt={<FormattedMessage {...messages.brandImg} />} />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <Notifications viewBox="-2 -2 25 25" />
          <FlatButton
            label={this.getUserProfileName()}
            icon={<AccountBox />}
            onClick={this.handleClick}
          />
        </ToolbarGroup>
        <Popover
          open={this.state.isOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <Logout />
          </Menu>
        </Popover>
      </StyledToolbar>
    );
  }
}

PrivateHeader.propTypes = {
  user: PropTypes.shape({
    user_name: PropTypes.string,
    user_id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default PrivateHeader;
