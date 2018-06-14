/**
 *
 * LaunchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Util from 'utils/Util';
import { getMetadata } from './actions';
import makeSelectLaunchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class LaunchPage extends React.Component {
  static ISS_PARAM_KEY = 'iss';
  static LAUNCH_PARAM_KEY = 'launch';
  static REQUIRED_PARAMS = [LaunchPage.ISS_PARAM_KEY, LaunchPage.LAUNCH_PARAM_KEY];

  constructor(props) {
    super(props);
    this.getLaunchParams = this.getLaunchParams.bind(this);
    this.getMissingRequiredParamKeys = this.getMissingRequiredParamKeys.bind(this);
  }

  componentDidMount() {
    const { iss, launch } = this.getLaunchParams();
    if (iss && launch) {
      this.props.getMetadata(iss, launch);
    }
  }

  getLaunchParams() {
    const { location } = this.props;
    const { iss, launch } = queryString.parse(location.search);
    return Util.pickByNonNullAndNonEmptyString({ iss, launch });
  }

  getMissingRequiredParamKeys() {
    const paramKeys = Object.keys(this.getLaunchParams());
    return LaunchPage.REQUIRED_PARAMS.filter((p) => !paramKeys.includes(p));
  }

  renderRedirectToErrorPage() {
    return (
      <Redirect
        to={{
          pathname: '/c2s-sof-ui/error',
          search: `?code=invalidLaunchParams&details=${this.getMissingRequiredParamKeys().join(', ')}`,
        }}
      />);
  }

  renderDefault() {
    return (
      <div>
        <Helmet>
          <title>Launch</title>
          <meta name="description" content="SMART on FHIR Launch Page" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }

  render() {
    if (this.getMissingRequiredParamKeys().length > 0) {
      return this.renderRedirectToErrorPage();
    }
    return this.renderDefault();
  }
}

LaunchPage.propTypes = {
  getMetadata: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  launchpage: makeSelectLaunchPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMetadata: (iss, launch) => dispatch(getMetadata(iss, launch)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'launchPage', reducer });
const withSaga = injectSaga({ key: 'launchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LaunchPage);
