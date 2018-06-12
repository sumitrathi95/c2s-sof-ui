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
import PatientHome from 'components/PatientHome';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // Todo: Get patient from context
    const patient = {
      name: [
        {
          firstName: 'Sally',
          lastName: 'Share',
        },
      ],
      identifier: [
        {
          system: '2.16.840.1.113883.4.1',
          oid: '',
          systemDisplay: 'SSN',
          value: '123-91-5555',
          priority: 0,
          display: '123-91-5555',
        },
      ],
      birthDate: '01/05/1986',
      genderCode: 'female',
    };

    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home page of Consent2Share Smart On Fhir" />
        </Helmet>
        <PatientHome patient={patient} />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(HomePage);
