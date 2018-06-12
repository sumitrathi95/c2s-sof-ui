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
import Dialog from 'material-ui/Dialog';
import Checkbox from 'components/Checkbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import { flattenConsentData } from 'components/ConsentCard/helpers';
import TextLabelGroup from 'components/TextLabelGroup';
import ConsentFormSection from 'components/ConsentFormSection';
import CheckPassword from './CheckPassword';
import messages from './messages';
import AttestConsentGrid from './AttestConsentGrid';

class AttestConsent extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      authenticationDialogOpen: false,
    };
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleDialogCallback = this.handleDialogCallback.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleCheckPassword() {
    this.setState({ authenticationDialogOpen: true });
  }

  handleDialogCallback() {
    this.setState({ authenticationDialogOpen: false });
  }

  checkPassword(password, actions) {
    this.props.checkPassword(password, actions);
    if (this.props.isAuthenticated) {
      this.setState({ authenticationDialogOpen: false });
    }
  }

  render() {
    const { onSubmit, consent, isAuthenticated, patient } = this.props;
    const patientName = consent && consent.patient && consent.patient.display;

    const flattenedConsent = consent && flattenConsentData(consent);
    return (
      <div>
        <Dialog
          open={!isAuthenticated && this.state.authenticationDialogOpen}
        >
          <CheckPassword callback={this.handleDialogCallback} checkPassword={this.checkPassword} />
        </Dialog>
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
                      checked={isAuthenticated}
                      label={<FormattedHTMLMessage {...messages.agreementTerm} values={{ patientName }} />}
                      onCheck={this.handleCheckPassword}
                    />
                  </ConsentFormSection>
                </Cell>
                <Cell area="buttonGroup">
                  <Grid columns={2}>
                    <Cell>
                      <StyledRaisedButton
                        fullWidth
                        type="submit"
                        disabled={!isAuthenticated}
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
      </div>
    );
  }
}

AttestConsent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default AttestConsent;
