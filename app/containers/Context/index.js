/**
 *
 * Context
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { initializeContext } from './actions';
import reducer from './reducer';
import saga from './saga';

export class Context extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // Todo: will retrieve ids from launch token
    const userId = null;
    const patientId = '269';
    const organizationId = '102';
    this.props.initializeContext(userId, patientId, organizationId);
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

Context.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  initializeContext: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    initializeContext: (userId, patientId, organizationId) => dispatch(initializeContext(userId, patientId, organizationId)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'context', reducer });
const withSaga = injectSaga({ key: 'context', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Context);
