/**
 *
 * SignatureAuthority
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Close from '@material-ui/icons/Close';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button';
import SignaturePad from 'react-signature-pad-wrapper';
import { Cell, Grid } from 'styled-css-grid';

import HorizontalAlignment from 'components/HorizontalAlignment';
import PanelSection from 'components/PanelSection';
import StyledDialog from 'components/StyledDialog';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

class SignatureAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearSignature = this.handleClearSignature.bind(this);
    this.handleSign = this.handleSign.bind(this);
  }

  handleClearSignature() {
    this.signaturePad.instance.clear();
  }

  handleSign() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      this.props.onConfirmAuthenticated(true, this.signaturePad.toDataURL());
      this.props.onSignatureDialogClose();
    }
  }

  render() {
    const { signatureDialogOpen, onSignatureDialogClose } = this.props;
    return (
      <StyledDialog open={signatureDialogOpen} fullWidth>
        <DialogTitle>
          <HorizontalAlignment position={'end'}>
            <StyledTooltip title="Close">
              <StyledIconButton onClick={onSignatureDialogClose}>
                <Close />
              </StyledIconButton>
            </StyledTooltip>
          </HorizontalAlignment>
          <FormattedMessage {...messages.authentication.header} />
        </DialogTitle>
        <DialogContent>
          <FormattedMessage {...messages.authentication.title} />
          <PanelSection>
            <SignaturePad ref={(ref) => (this.signaturePad = ref)} />
          </PanelSection>
          <Grid columns={2} gap="10px">
            <Cell>
              <Button
                variant="raised"
                fullWidth
                onClick={this.handleClearSignature}
              >
                <FormattedMessage {...messages.authentication.clearButton} />
              </Button>
            </Cell>
            <Cell>
              <StyledRaisedButton fullWidth onClick={this.handleSign}>
                <FormattedMessage {...messages.authentication.signButton} />
              </StyledRaisedButton>
            </Cell>
          </Grid>
        </DialogContent>
      </StyledDialog>
    );
  }
}

SignatureAuthentication.propTypes = {
  signatureDialogOpen: PropTypes.bool.isRequired,
  onSignatureDialogClose: PropTypes.func.isRequired,
  onConfirmAuthenticated: PropTypes.func.isRequired,
};

export default SignatureAuthentication;
