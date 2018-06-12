/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Notification from 'containers/Notification';
import ManageConsentPage from 'containers/ManageConsentPage';
import AttestConsentPage from 'containers/AttestConsentPage';
import Consent2ShareHomePage from 'containers/Consent2ShareHomePage';
import PrivateLayoutRoute from 'components/PrivateLayoutRoute';
import saga from './saga';
import './styles.css';


export function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Consent2Share Smart on Fhir"
        defaultTitle="Consent2Share Smart on Fhir"
      >
        <meta name="description" content="Consent2Share Smart on Fhir application" />
      </Helmet>
      <div>
        <Switch>
          <Redirect exact from="/" to="/c2s-sof-ui/home" />
          <PrivateLayoutRoute exact path="/c2s-sof-ui/home" component={Consent2ShareHomePage} />
          <PrivateLayoutRoute path="/c2s-sof-ui/manage-consent/:id?" component={ManageConsentPage} />
          <PrivateLayoutRoute path="/c2s-sof-ui/attest-consent/:id?" component={AttestConsentPage} />
          <PrivateLayoutRoute path="/ocp-ui/sign-consent/:id" component={AttestConsentPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Notification />
      </div>
    </div>
  );
}

const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withSaga,
)(App);
