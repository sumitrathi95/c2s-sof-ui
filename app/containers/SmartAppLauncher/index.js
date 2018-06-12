/**
 *
 * SmartAppLauncher
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Apps from '@material-ui/icons/Apps';
import Close from '@material-ui/icons/Close';
import Settings from '@material-ui/icons/Settings';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledDialog from 'components/StyledDialog';
import InfoSection from 'components/InfoSection';
import StickyDiv from 'components/StickyDiv';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE } from 'containers/App/constants';
import { makeSelectConfig } from 'containers/App/selectors';
import makeSelectContext from 'containers/App/contextSelectors';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { makeSelectSmartApps } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createLaunch, getClients } from './actions';
import messages from './messages';

export class SmartAppLauncher extends React.Component {
  static SMART_APP_LOGO_STYLE = { width: 50, height: 50 };
  static SMART_APP_LOGO_SRC_PREFIX = 'data:image/png;base64,';
  static SMART_APP_LOGO_ALT_SUFFIX = ' Logo';

  constructor(props) {
    super(props);
    this.state = {
      smartAppsDialogOpen: false,
    };
    this.handleSmartAppsDialogToggle = this.handleSmartAppsDialogToggle.bind(this);
    this.handleLaunch = this.handleLaunch.bind(this);
    this.handleSmartAppSettingsClick = this.handleSmartAppSettingsClick.bind(this);
  }

  componentDidMount() {
    this.props.getClients();
  }

  handleSmartAppsDialogToggle() {
    this.setState(({ smartAppsDialogOpen }) => ({ smartAppsDialogOpen: !smartAppsDialogOpen }));
  }

  handleLaunch(clientId) {
    this.props.createLaunch(clientId);
  }

  handleSmartAppSettingsClick() {
    const { config } = this.props;
    const authorizationServerEndpoint = get(config, 'oauth2.authorizationServerEndpoint');
    if (authorizationServerEndpoint) {
      window.open(`${authorizationServerEndpoint}/profile`);
    }
  }

  render() {
    const { smartApps } = this.props;
    return (
      <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}>
        <StyledFlatButton onClick={this.handleSmartAppsDialogToggle}>
          <Apps />
          <InfoSection fontSize="14px">
            <FormattedMessage {...messages.buttonLabel} />
          </InfoSection>
        </StyledFlatButton>
        <StyledDialog open={this.state.smartAppsDialogOpen} onClose={this.handleSmartAppsDialogToggle}>
          <StickyDiv>
            <DialogTitle>
              <HorizontalAlignment position="center">
                <Grid columns="1.5fr 1fr 0px 1.5fr">
                  <Cell />
                  <Cell middle>
                    <FormattedMessage {...messages.buttonLabel} />
                  </Cell>
                  <Cell middle>
                    <StyledFlatButton onClick={this.handleSmartAppSettingsClick}>
                      <Settings />
                    </StyledFlatButton>
                  </Cell>
                  <Cell middle>
                    <HorizontalAlignment position="end">
                      <StyledTooltip title="Close">
                        <StyledIconButton onClick={this.handleSmartAppsDialogToggle}>
                          <Close />
                        </StyledIconButton>
                      </StyledTooltip>
                    </HorizontalAlignment>
                  </Cell>
                </Grid>
              </HorizontalAlignment>
            </DialogTitle>
          </StickyDiv>
          <DialogContent>
            <Grid columns={3} justifyContent="space-around" gap="16px">
              {smartApps.map(({ clientId, clientName, appIcon }) => (
                <Cell key={clientId} middle>
                  <HorizontalAlignment position="center">
                    <StyledFlatButton onClick={() => this.handleLaunch(clientId)}>
                      <Grid columns={1}>
                        <Cell>
                          {appIcon &&
                          <img
                            style={SmartAppLauncher.SMART_APP_LOGO_STYLE}
                            alt={`${clientName}${SmartAppLauncher.SMART_APP_LOGO_ALT_SUFFIX}`}
                            src={`${SmartAppLauncher.SMART_APP_LOGO_SRC_PREFIX}${appIcon}`}
                          />}
                        </Cell>
                        <Cell>
                          {clientName}
                        </Cell>
                      </Grid>
                    </StyledFlatButton>
                  </HorizontalAlignment>
                </Cell>
              ))}
            </Grid>
          </DialogContent>
        </StyledDialog>
      </ShowHideWrapper>
    );
  }
}

SmartAppLauncher.propTypes = {
  getClients: PropTypes.func.isRequired,
  createLaunch: PropTypes.func.isRequired,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })),
  config: PropTypes.shape({
    oauth2: PropTypes.shape({
      authorizationServerEndpoint: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  smartApps: makeSelectSmartApps(),
  context: makeSelectContext(),
  config: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    getClients: () => dispatch(getClients()),
    createLaunch: (clientId) => dispatch(createLaunch(clientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartAppLauncher', reducer });
const withSaga = injectSaga({ key: 'smartAppLauncher', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartAppLauncher);
