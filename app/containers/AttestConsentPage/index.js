/**
 *
 * AttestConsentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { isCareCoordinator, mapToName } from 'containers/App/helpers';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import AttestConsent from 'components/AttestConsent';
import reducer from './reducer';
import saga from './saga';
import { attestConsent, checkPassword, getConsent, initializeAttestConsentPage } from './actions';
import { makeSelectConsent, makeSelectIsAuthenticated } from './selectors';


export class AttestConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  componentDidMount() {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getConsent(logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeAttestConsentPage();
  }

  handleSubmit(values, actions) {
    this.props.attestConsent(this.props.match.params.id, () => actions.setSubmitting(false));
  }

  checkPassword(password, actions) {
    this.props.checkPassword(password, () => actions.setSubmitting(false));
  }

  render() {
    const { consent, isAuthenticated, patient, user } = this.props;
    let careCoordinatorContext = null;
    if (user && user.fhirResource.role && isCareCoordinator(user.fhirResource.role)) {
      careCoordinatorContext = {
        logicalId: user.fhirResource.logicalId,
        name: mapToName(user.fhirResource.name),
        identifiers: user.fhirResource.identifiers,
      };
    }
    return (
      <Page color="secondary">
        <Helmet>
          <title>Attest Consent</title>
          <meta name="description" content="Sign consent page of Consent2Share Smart On Fhir" />
        </Helmet>
        <PageHeader title="Sign Consent" />
        <PageContent>
          <AttestConsent
            onSubmit={this.handleSubmit}
            checkPassword={this.checkPassword}
            consent={consent}
            patient={patient}
            isAuthenticated={isAuthenticated}
            careCoordinatorContext={careCoordinatorContext}
          />
        </PageContent>
      </Page>
    );
  }
}

AttestConsentPage.propTypes = {
  match: PropTypes.object.isRequired,
  initializeAttestConsentPage: PropTypes.func.isRequired,
  getConsent: PropTypes.func.isRequired,
  attestConsent: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({
    fhirResource: PropTypes.shape({
      role: PropTypes.string.isRequired,
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

const mapStateToProps = createStructuredSelector({
  consent: makeSelectConsent(),
  isAuthenticated: makeSelectIsAuthenticated(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeAttestConsentPage: () => dispatch(initializeAttestConsentPage()),
    getConsent: (logicalId) => dispatch(getConsent(logicalId)),
    attestConsent: (logicalId, handleSubmitting) => dispatch(attestConsent(logicalId, handleSubmitting)),
    checkPassword: (password, handleSubmitting) => dispatch(checkPassword(password, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'attestConsentPage', reducer });
const withSaga = injectSaga({ key: 'attestConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AttestConsentPage);
