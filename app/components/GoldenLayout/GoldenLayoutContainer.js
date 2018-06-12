import styled from 'styled-components';
import PropTypes from 'prop-types';

const GoldenLayoutContainer = styled.div`
  /* Set height considering app bar height */
  & .lm_header {
    background: #fff;
    border: 1px solid #099;
    padding: 0 10px 0 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 0;
  }

  & .lm_controls {
    margin-top: 10px;
  }

  & .lm_stack {
    background: #fff;
    border-bottom: 0;
  }

  & .lm_header + .lm_items {
    background: #fff;
    border: 1px solid #099;
    padding: 0 10px 0 10px;
    border-top: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  & .lm_header + .lm_items,
  .lm_item_container {
    width: auto !important;
    height: ${(props) => props.contentHeight};
  }

  & .lm_root {
    background: #fff;
    height: ${(props) => props.containerHeight};
    width: ${(props) => props.containerWidth};
  }

  /* Enable scroll content */
  & .lm_content {
    overflow: auto;
    border: 0;
    background: #fff;
  }

  & .lm_tabs {
    margin-top: 10px;
  }

  & .lm_tab {
    font-weight: bold;
  }

  & .lm_tab.lm_active {
    color: ${(props) => props.primaryColor};
    background: ${(props) => props.secondaryColor};
    font-size: 13px;
    font-family: Arial Bold, Arial, sans-serif;
  }

  & .lm_tab.lm_active:hover,
  .lm_tab:hover {
    color: #099;
    font-size: 13px;
  }

  & .lm_title {
    text-transform: uppercase;
  }
`;

GoldenLayoutContainer.propTypes = {
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  contentHeight: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};

GoldenLayoutContainer.defaultProps = {
  containerHeight: 'calc(100vh - 75px)',
  containerWidth: '100vw',
  primaryColor: '#33666f',
  secondaryColor: '#ffffff',
  contentHeight: 'auto',
};

export default GoldenLayoutContainer;
