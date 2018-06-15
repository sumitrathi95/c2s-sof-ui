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
import { makeSelectPatient } from 'containers/App/contextSelectors';
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
    const { consent, isAuthenticated, patient } = this.props;
    return (
      <div>
        <Helmet>
          <title>AttestConsentPage</title>
          <meta name="description" content="Sign consent" />
        </Helmet>
        <AttestConsent
          onSubmit={this.handleSubmit}
          checkPassword={this.checkPassword}
          consent={consent}
          patient={patient}
          isAuthenticated={isAuthenticated}
        />
      </div>
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
};

const mapStateToProps = createStructuredSelector({
  consent: makeSelectConsent(),
  isAuthenticated: makeSelectIsAuthenticated(),
  patient: makeSelectPatient(),
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
