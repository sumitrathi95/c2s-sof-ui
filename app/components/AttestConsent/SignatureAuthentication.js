/**
 *
 * SignatureAuthentication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Close from '@material-ui/icons/Close';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import HorizontalAlignment from 'components/HorizontalAlignment';
import SignaturePad from 'components/SignaturePad';
import StyledDialog from 'components/StyledDialog';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import messages from './messages';

class SignatureAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveSignature = this.handleSaveSignature.bind(this);
  }

  handleSaveSignature(signatureDataURL) {
    this.props.onSignatureDialogClose();
    this.props.onConfirmAuthenticated(signatureDataURL);
  }

  render() {
    const { signatureDialogOpen, onSignatureDialogClose } = this.props;
    return (
      <StyledDialog open={signatureDialogOpen} fullWidth>
        <DialogTitle>
          <HorizontalAlignment position="end">
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
          <SignaturePad onSaveSignature={this.handleSaveSignature} />
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
