/**
*
* Padding
*
*/
import PropType from 'prop-types';
import styled from 'styled-components';


const Padding = styled.div`
  padding-top: ${(props) => props.top ? props.top : 0};
  padding-right: ${(props) => props.right ? props.right : 0};
  padding-bottom: ${(props) => props.bottom ? props.bottom : 0};
  padding-left: ${(props) => props.left ? props.left : 0};
`;

Padding.propTypes = {
  top: PropType.string,
  right: PropType.string,
  bottom: PropType.string,
  left: PropType.string,
};

export default Padding;
