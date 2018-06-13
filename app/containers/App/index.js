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
import { Redirect, Switch } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import Context from 'containers/Context';
import Notification from 'containers/Notification';
import PrivateLayoutRoute from 'components/PrivateLayoutRoute';
import PublicLayoutRoute from 'components/PublicLayoutRoute';
import AttestConsentPage from 'containers/AttestConsentPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ManageConsentPage from 'containers/ManageConsentPage/Loadable';
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
        <Context>
          <Switch>
            <Redirect exact from="/" to="/c2s-sof-ui/home" />
            <PrivateLayoutRoute exact path="/c2s-sof-ui/home" component={HomePage} />
            <PrivateLayoutRoute path="/c2s-sof-ui/manage-consent/:id?" component={ManageConsentPage} />
            <PrivateLayoutRoute path="/c2s-sof-ui/attest-consent/:id?" component={AttestConsentPage} />
            <PrivateLayoutRoute path="/ocp-ui/sign-consent/:id" component={AttestConsentPage} />
            <PublicLayoutRoute component={NotFoundPage} />
          </Switch>
        </Context>
        <Notification />
      </div>
    </div>
  );
}

const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withSaga,
)(App);
