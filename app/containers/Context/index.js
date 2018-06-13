/**
 *
 * Context
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getPatient, refreshPatient } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPatient } from './selectors';

export class Context extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const patientId = '269';
    const { patient } = this.props;
    if (patient && patient.id && patient.id === patientId) {
      this.props.refreshPatient();
    } else {
      this.props.getPatient(patientId);
    }
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
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  refreshPatient: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'context', reducer });
const withSaga = injectSaga({ key: 'context', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Context);
