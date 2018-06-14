/**
 *
 * TokenRetrievePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import queryString from 'query-string';
import { withStyles } from 'material-ui-next/styles';
import Paper from 'material-ui-next/Paper';
import Typography from 'material-ui-next/Typography';
import { LinearProgress } from 'material-ui-next/Progress';

import injectSaga from 'utils/injectSaga';
import Util from 'utils/Util';
import saga from './saga';
import messages from './messages';
import { getToken } from './actions';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    padding: 16,
    margin: theme.spacing.unit * 3,
  }),
});

export class TokenRetrievePage extends React.Component {
  static CODE_PARAM_KEY = 'code';
  static STATE_PARAM_KEY = 'state';
  static REQUIRED_PARAMS = [TokenRetrievePage.CODE_PARAM_KEY, TokenRetrievePage.STATE_PARAM_KEY];

  constructor(props) {
    super(props);
    this.getAuthorizationParams = this.getAuthorizationParams.bind(this);
    this.getMissingRequiredParamKeys = this.getMissingRequiredParamKeys.bind(this);
  }

  componentDidMount() {
    const { code, state } = this.getAuthorizationParams();
    if (code && state) {
      this.props.getToken(code, state);
    }
  }

  getAuthorizationParams() {
    const { location } = this.props;
    const { code, state } = queryString.parse(location.search);
    return Util.pickByNonNullAndNonEmptyString({ code, state });
  }

  getMissingRequiredParamKeys() {
    const paramKeys = Object.keys(this.getAuthorizationParams());
    return TokenRetrievePage.REQUIRED_PARAMS.filter((p) => !paramKeys.includes(p));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Authorization Token Retrieve</title>
          <meta name="description" content="Authorization Token Retrieve Page" />
        </Helmet>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            <FormattedMessage {...messages.header} />
          </Typography>
          <Typography variant="display1">
            <LinearProgress />
          </Typography>
        </Paper>
      </div>
    );
  }
}

TokenRetrievePage.propTypes = {
  getToken: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    getToken: (code, state) => dispatch(getToken(code, state)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'tokenRetrievePage', saga });

export default compose(
  withStyles(styles),
  withSaga,
  withConnect,
)(TokenRetrievePage);
