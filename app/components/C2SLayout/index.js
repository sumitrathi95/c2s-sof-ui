/**
 *
 * C2SLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'styled-css-grid';
import C2SPrivateHeader from 'containers/C2SPrivateHeader';


function C2SLayout(props) {
  return (
    <Grid columns={1}>
      <C2SPrivateHeader />
      <main>{props.children}</main>
    </Grid>
  );
}

C2SLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default C2SLayout;
