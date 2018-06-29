/**
 *
 * RevokeConsent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { FormControlLabel, FormGroup } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import { Cell, Grid } from 'styled-css-grid';

import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import SignatureAuthenticationDialog from 'components/SignatureAuthenticationDialog';
import ConsentFormSection from 'components/ConsentFormSection';
import RevokeConsentGrid from './RevokeConsentGrid';
import messages from './messages';

class RevokeConsent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      signatureDialogOpen: false,
      signatureDataURL: null,
    };
    this.handleSignatureDialogOpen = this.handleSignatureDialogOpen.bind(this);
    this.handleSignatureDialogClose = this.handleSignatureDialogClose.bind(this);
    this.handleSaveSignature = this.handleSaveSignature.bind(this);
    this.handleRevokeConsent = this.handleRevokeConsent.bind(this);
  }

  handleSignatureDialogOpen() {
    this.setState({
      signatureDialogOpen: true,
      isAuthenticated: false,
    });
  }

  handleSignatureDialogClose() {
    this.setState({ signatureDialogOpen: false });
  }

  handleSaveSignature(signatureDataURL) {
    if (signatureDataURL) {
      this.setState({
        isAuthenticated: true,
        signatureDataURL,
      });
    }
  }

  handleRevokeConsent() {
    this.props.onRevokeConsent(this.state.signatureDataURL);
  }

  render() {
    const { consent, patient, isSubmitting } = this.props;
    const patientName = consent && consent.patient && consent.patient.display;

    return (
      <div>
        <RevokeConsentGrid>
          <Cell area="revocationConsentGroup">
            <ConsentFormSection title={<FormattedMessage {...messages.header} />}>
              <Grid columns={1} gap={'20px'}>
                <Cell>
                  <FormattedMessage {...messages.label.consentRef} />
                  <strong>{consent && consent.logicalId}</strong>
                </Cell>
                <Cell>
                  <FormattedMessage {...messages.label.patientName} />
                  <strong>{consent && consent.patient && consent.patient.display}</strong>
                </Cell>
                <Cell>
                  <FormattedMessage {...messages.label.patientDob} />
                  <strong>{patient && patient.birthDate}</strong>
                </Cell>
              </Grid>
              <FormattedHTMLMessage {...messages.revokeTerm} />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.isAuthenticated}
                      onChange={this.handleSignatureDialogOpen}
                    />
                  }
                  label={<FormattedHTMLMessage {...messages.agreementTerm} values={{ patientName }} />}
                />
              </FormGroup>
            </ConsentFormSection>
          </Cell>
          <Cell>
          </Cell>
          <Cell area="buttonGroup">
            <Grid columns={2}>
              <Cell>
                <StyledRaisedButton
                  fullWidth
                  onClick={this.handleRevokeConsent}
                  disabled={!this.state.isAuthenticated || isSubmitting}
                >
                  <FormattedMessage {...messages.completeButton} />
                </StyledRaisedButton>
              </Cell>
              <Cell>
                <GoBackButton disabled={isSubmitting} />
              </Cell>
            </Grid>
          </Cell>
        </RevokeConsentGrid>
        <SignatureAuthenticationDialog
          signatureDialogOpen={this.state.signatureDialogOpen}
          onSignatureDialogClose={this.handleSignatureDialogClose}
          onSaveSignature={this.handleSaveSignature}
        />
      </div>
    );
  }
}

RevokeConsent.propTypes = {
  onRevokeConsent: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
  isSubmitting: PropTypes.bool.isRequired,
};

export default RevokeConsent;
