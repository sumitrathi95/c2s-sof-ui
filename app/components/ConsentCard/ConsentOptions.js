/**
 *
 * ConsentCard
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';

import Util from 'utils/Util';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import PreviewConsent from './PreviewConsent';
import messages from './messages';

const CONSENT_STATUS_DRAFT = 'DRAFT';
const CONSENT_STATUS_ACTIVE = 'ACTIVE';

class ConsentOptions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isManageConsentDialogOpen: false,
      isPreviewConsentDialogOpen: false,
      isDeleteConsentDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handlePreviewConsentOpen = this.handlePreviewConsentOpen.bind(this);
    this.handlePreviewConsentClose = this.handlePreviewConsentClose.bind(this);
    this.handleDeleteConsentOpen = this.handleDeleteConsentOpen.bind(this);
    this.handleDeleteConsentClose = this.handleDeleteConsentClose.bind(this);
    this.handleDeleteConsentOk = this.handleDeleteConsentOk.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isManageConsentDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isManageConsentDialogOpen: false });
  }

  handlePreviewConsentClose() {
    this.setState({ isPreviewConsentDialogOpen: false });
  }

  handlePreviewConsentOpen() {
    this.setState({
      isManageConsentDialogOpen: false,
      isPreviewConsentDialogOpen: true,
    });
  }

  handleDeleteConsentOpen() {
    this.setState({
      isDeleteConsentDialogOpen: true,
    });
  }

  handleDeleteConsentClose() {
    this.setState({ isDeleteConsentDialogOpen: false });
  }

  handleDeleteConsentOk() {
    const { consent } = this.props;
    if (this.state.isDeleteConsentDialogOpen) {
      this.props.handleDeleteConsent(consent);
      this.setState({
        isDeleteConsentDialogOpen: false,
        isManageConsentDialogOpen: false,
      });
    }
  }

  render() {
    const { consent, user } = this.props;
    const { logicalId, status, sourceAttachment } = consent;
    return (
      <div>
        <StyledRaisedButton onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.manageConsentButton} />
        </StyledRaisedButton>
        <StyledDialog open={this.state.isManageConsentDialogOpen} onClose={this.handleCloseDialog} fullWidth>
          <DialogTitle>
            <HorizontalAlignment position={'end'}>
              <StyledTooltip title="Close">
                <StyledIconButton onClick={this.handleCloseDialog}>
                  <CloseIcon />
                </StyledIconButton>
              </StyledTooltip>
            </HorizontalAlignment>
            <FormattedMessage {...messages.consentDialog.title} />
          </DialogTitle>
          <DialogContent>
            <Grid columns={1}>
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/manage-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.editConsentOption} />
                  </Button>
                </Cell>
              }
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) && (user && user.isPatient) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/attest-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.attestConsentOption} />
                  </Button>
                </Cell>
              }
              <Cell>
                <Button
                  variant="raised"
                  fullWidth
                  onClick={this.handlePreviewConsentOpen}
                >
                  <FormattedMessage {...messages.consentDialog.previewConsentOption} />
                </Button>
              </Cell>
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_ACTIVE) && (user && user.isPatient) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/revoke-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.revokeConsentOption} />
                  </Button>
                </Cell>
              }
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    onClick={this.handleDeleteConsentOpen}
                  >
                    <FormattedMessage {...messages.consentDialog.deleteConsentOption} />
                  </Button>
                </Cell>
              }
            </Grid>
          </DialogContent>
        </StyledDialog>
        <PreviewConsent
          previewConsentDialogOpen={this.state.isPreviewConsentDialogOpen}
          onPreviewConsentDialogClose={this.handlePreviewConsentClose}
          sourceAttachment={sourceAttachment}
        />
        <StyledDialog open={this.state.isDeleteConsentDialogOpen} onClose={this.handleDeleteConsentClose} fullWidth>
          <DialogTitle>
            <FormattedMessage {...messages.consentDialog.deleteConsentTitle} />
          </DialogTitle>
          <DialogContent>
            <FormattedMessage {...messages.consentDialog.deleteConsentMessage} />
            <HorizontalAlignment position={'end'}>
              <Grid columns={2} alignContent="space-between">
                <Cell>
                  <StyledRaisedButton fullWidth onClick={this.handleDeleteConsentOk}>
                    <FormattedMessage {...messages.consentDialog.okButton} />
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <StyledRaisedButton fullWidth onClick={this.handleDeleteConsentClose}>
                    <FormattedMessage {...messages.consentDialog.cancelButton} />
                  </StyledRaisedButton>
                </Cell>
              </Grid>
            </HorizontalAlignment>
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

ConsentOptions.propTypes = {
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    sourceAttachment: PropTypes.string,
  }).isRequired,
  handleDeleteConsent: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isPatient: PropTypes.bool.isRequired,
    fhirResource: PropTypes.shape({
      logicalId: PropTypes.string,
      name: PropTypes.array,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
    }),
  }),
};

export default ConsentOptions;
