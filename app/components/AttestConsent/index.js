/**
 *
 * AttestConsent
 *
 */

import React from 'react';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import { flattenConsentData } from 'components/ConsentCard/helpers';
import TextLabelGroup from 'components/TextLabelGroup';
import ConsentFormSection from 'components/ConsentFormSection';
import SignatureAuthentication from './SignatureAuthentication';
import AttestConsentGrid from './AttestConsentGrid';
import messages from './messages';

class AttestConsent extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      signatureDialogOpen: false,
    };
    this.handleSignatureDialogOpen = this.handleSignatureDialogOpen.bind(this);
    this.handleSignatureDialogClose = this.handleSignatureDialogClose.bind(this);
    this.confirmAuthenticated = this.confirmAuthenticated.bind(this);
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

  confirmAuthenticated(hasSigned, signatureData) {
    if (hasSigned && signatureData) {
      this.setState({ isAuthenticated: true });
      console.log(signatureData);
    }
  }

  render() {
    const { onSubmit, consent, patient, careCoordinatorContext } = this.props;
    const patientName = consent && consent.patient && consent.patient.display;
    const careCoordinatorName = careCoordinatorContext && careCoordinatorContext.name;

    const flattenedConsent = consent && flattenConsentData(consent);
    return (
      <div>
        <Formik
          onSubmit={(values, actions) => onSubmit(values, actions)}
          render={({ isSubmitting }) => (
            <Form>
              <AttestConsentGrid>
                <Cell area="patientGroup">
                  <ConsentFormSection title={<FormattedMessage {...messages.header} />}>
                    <Grid columns={2} gap={'20px'}>
                      <Cell>
                        <FormattedMessage {...messages.label.patientName} />
                        <strong>{consent && consent.patient && consent.patient.display}</strong>
                      </Cell>
                      <Cell>
                        <FormattedMessage {...messages.label.patientDob} />
                        <strong>{patient && patient.birthDate}</strong>
                      </Cell>
                    </Grid>
                  </ConsentFormSection>
                </Cell>
                <Cell area="medicalInfoGroup">
                  <ConsentFormSection title={<FormattedMessage {...messages.subtitle.medicalInfoGroup} />}>
                    <Grid columns="repeat(2, 1fr) 0.2fr">
                      <Cell>
                        <TextLabelGroup
                          label={<FormattedMessage {...messages.label.authorizes} />}
                          text={flattenedConsent && flattenedConsent.fromActor}
                        />
                      </Cell>
                      <Cell>
                        <TextLabelGroup
                          label={<FormattedMessage {...messages.label.discloses} />}
                          text={flattenedConsent && flattenedConsent.toActor}
                        />
                      </Cell>
                    </Grid>
                  </ConsentFormSection>
                </Cell>
                <Cell area="purposeOfUseGroup">
                  <ConsentFormSection title={<FormattedMessage {...messages.subtitle.purposeOfUseGroup} />}>
                    <TextLabelGroup
                      label={<FormattedMessage {...messages.label.purposes} />}
                      text={flattenedConsent && flattenedConsent.purpose}
                    />
                  </ConsentFormSection>
                </Cell>
                <Cell area="consentTerm">
                  <ConsentFormSection title={<FormattedMessage {...messages.subtitle.consentTerm} />}>
                    <FormattedHTMLMessage {...messages.attestTerm} values={{ patientName }} />
                    <Grid columns={2} gap={'20px'}>
                      <Cell><FormattedMessage {...messages.label.effectiveDate} /><strong>{consent && consent.period && consent.period.start}</strong></Cell>
                      <Cell><FormattedMessage {...messages.label.expirationDate} /><strong>{consent && consent.period && consent.period.end}</strong></Cell>
                    </Grid>
                    <Checkbox
                      name="agreement"
                      checked={this.state.isAuthenticated}
                      label={
                        careCoordinatorName ?
                          <FormattedHTMLMessage
                            {...messages.agreementTermOnBehalfOfPatient}
                            values={{ careCoordinatorName, patientName }}
                          /> :
                          <FormattedHTMLMessage {...messages.agreementTerm} values={{ patientName }} />
                      }
                      onCheck={this.handleSignatureDialogOpen}
                    />
                  </ConsentFormSection>
                </Cell>
                <Cell area="buttonGroup">
                  <Grid columns={2}>
                    <Cell>
                      <StyledRaisedButton
                        fullWidth
                        type="submit"
                        disabled={!this.state.isAuthenticated}
                      >
                        Complete
                      </StyledRaisedButton>
                    </Cell>
                    <Cell>
                      <GoBackButton disabled={isSubmitting} />
                    </Cell>
                  </Grid>
                </Cell>
              </AttestConsentGrid>
            </Form>
          )}
        />
        <SignatureAuthentication
          signatureDialogOpen={this.state.signatureDialogOpen}
          onSignatureDialogClose={this.handleSignatureDialogClose}
          onConfirmAuthenticated={this.confirmAuthenticated}
        />
      </div>
    );
  }
}

AttestConsent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
  careCoordinatorContext: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
};

export default AttestConsent;
