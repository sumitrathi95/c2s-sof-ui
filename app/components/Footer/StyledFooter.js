import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';

const StyledFooter = styled(AppBar)`
  background-color: rgba(32, 60, 85, 1) !important;
`;

StyledFooter.propTypes = {
  ...(AppBar.propTypes || {}),
};

export default StyledFooter;
