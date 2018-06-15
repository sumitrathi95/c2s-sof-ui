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
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';

import Padding from 'components/Padding';
import messages from './messages';


function LogoutPage() {
  return (
    <div>
      <Helmet>
        <title>Logout</title>
        <meta name="description" content="Logout page of Consent2Share Smart On Fhir" />
      </Helmet>
      <Padding top={30} right={20} left={20}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              <FormattedMessage {...messages.header} />
            </Typography>
            <Typography component="p">
              <FormattedMessage {...messages.content} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="default" onClick={() => window.close()}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Padding>
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
