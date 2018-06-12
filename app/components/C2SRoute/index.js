/**
 *
 * C2SRoute
 *
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import C2SLayout from 'components/C2SLayout';


function C2SRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <C2SLayout>
          <Component {...matchProps} />
        </C2SLayout>
      )}
    />
  );
}

C2SRoute.propTypes = {
  component: PropTypes.func,
};

export default C2SRoute;
