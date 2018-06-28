/**
 *
 * RevokeConsentPage
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
import RevokeConsent from 'components/RevokeConsent';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { getConsent, initializeRevokeConsentPage, revokeConsent } from './actions';
import { makeSelectConsent } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class RevokeConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getConsent(logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeRevokeConsentPage();
  }

  handleSubmit(values, actions) {
    this.props.revokeConsent(this.props.match.params.id, () => actions.setSubmitting(false));
  }

  render() {
    const { consent, patient } = this.props;
    return (
      <div>
        <Helmet>
          <title>RevokeConsentPage</title>
          <meta name="description" content="Revoke Consent" />
        </Helmet>
        <RevokeConsent
          onSubmit={this.handleSubmit}
          consent={consent}
          patient={patient}
        />
      </div>
    );
  }
}

RevokeConsentPage.propTypes = {
  match: PropTypes.object.isRequired,
  initializeRevokeConsentPage: PropTypes.func.isRequired,
  getConsent: PropTypes.func.isRequired,
  revokeConsent: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  consent: makeSelectConsent(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeRevokeConsentPage: () => dispatch(initializeRevokeConsentPage()),
    getConsent: (logicalId) => dispatch(getConsent(logicalId)),
    revokeConsent: (logicalId, handleSubmitting) => dispatch(revokeConsent(logicalId, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'revokeConsentPage', reducer });
const withSaga = injectSaga({ key: 'revokeConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RevokeConsentPage);
