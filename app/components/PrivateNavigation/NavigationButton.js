/**
 *
 * NavigationButton
 *
 */

import styled from 'styled-components';
import StyledFlatButton from 'components/StyledFlatButton';

const NavigationButton = styled(StyledFlatButton)`
  && {
    color: #9cc;
    font-size: 12px;
    padding-left: 5px;
    max-height: 32px;
  }

  &&:hover {
    background-color: inherit;
  }
`;

NavigationButton.propTypes = {};

export default NavigationButton;
