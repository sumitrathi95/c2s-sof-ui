/**
 *
 * LogoutPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Paper from 'material-ui-next/Paper';

import messages from './messages';

function LogoutPage() {
  return (
    <div>
      <Helmet>
        <title>Logout</title>
        <meta name="description" content="Logout page of Consent2Share Smart On Fhir" />
      </Helmet>
      <Paper>
        <FormattedMessage {...messages.header} />
      </Paper>
    </div>
  );
}

LogoutPage.propTypes = {
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
)(LogoutPage);
