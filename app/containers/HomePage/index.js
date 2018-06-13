/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LinearProgress } from 'material-ui-next/Progress';

import { makeSelectPatient } from 'containers/Context/selectors';
import PatientHome from 'components/PatientHome';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home page of Consent2Share Smart On Fhir" />
        </Helmet>
        {this.props.patient ?
          <PatientHome patient={this.props.patient} /> :
          <LinearProgress />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(HomePage);
