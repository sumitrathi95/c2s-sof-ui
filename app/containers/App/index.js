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
import Authentication from 'containers/Authentication';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Notification from 'containers/Notification';
import ManageConsentPage from 'containers/ManageConsentPage';
import AttestConsentPage from 'containers/AttestConsentPage';
import Consent2ShareHomePage from 'containers/Consent2ShareHomePage';
import C2SRoute from 'components/C2SRoute';
import saga from './saga';
import './styles.css';


export function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Omnibus Care Plan"
        defaultTitle="Omnibus Care Plan"
      >
        <meta name="description" content="Omnibus Care Plan application" />
      </Helmet>
      <div>
        <Switch>
          <Redirect exact from="/" to="/ocp-ui/login" />
          <Route exact path="/ocp-ui" component={LoginPage} />
          <Route path="/ocp-ui/login" component={LoginPage} />
          <C2SRoute exact path="/c2s-sof-ui/patient/:id?" component={Consent2ShareHomePage} />
          <C2SRoute path="/c2s-sof-ui/manage-consent/:id?" component={ManageConsentPage} />
          <C2SRoute path="/c2s-sof-ui/attest-consent/:id?" component={AttestConsentPage} />
          {/* Import all security page MUST put inside Authorization component */}
          <Authentication>
            <Route path="/ocp-ui/sign-consent/:id" component={AttestConsentPage} />
          </Authentication>
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
