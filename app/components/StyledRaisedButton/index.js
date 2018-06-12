/**
 *
 * StyledRaisedButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'material-ui-next/Button';
import common from 'material-ui-next/colors/common';
import teal from 'material-ui-next/colors/teal';

const StyledRaisedButton = styled(({ marginRight, ...rest }) => (<Button variant="raised" {...rest} />))`
  && {
    background-color: ${teal['500']};
    color: ${common.white};
    font-size: 13px;
    font-weight: bold;
    text-transform: capitalize;
    margin-right: ${({ marginRight }) => marginRight}px;
  }

  &&:hover {
    background-color: ${teal['700']};
  }

  &&:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

StyledRaisedButton.propTypes = {
  marginRight: PropTypes.number,
};

StyledRaisedButton.defaultProps = {
  marginRight: 0,
};

export default StyledRaisedButton;
