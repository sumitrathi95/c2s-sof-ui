/**
 *
 * PractitionerToDos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import isEmpty from 'lodash/isEmpty';
import { getFilterToDos, getPractitionerToDos } from 'containers/PractitionerToDos/actions';
import { makeSelectToDoFilterDateRanges } from 'containers/App/lookupSelectors';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectPractitionerToDos, makeSelectSearchLoading } from 'containers/PractitionerToDos/selectors';
import { CARE_COORDINATOR_ROLE_CODE, DATE_RANGE, TO_DO_DEFINITION } from 'containers/App/constants';
import { PanelToolbar } from 'components/PanelToolbar';
import ToDoList from 'components/ToDoList';
import NoResultsFoundText from 'components/NoResultsFoundText';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PractitionerToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    this.props.getLookups();
    const definition = TO_DO_DEFINITION;
    const practitionerId = this.getPractitionerId();
    if (practitionerId) {
      this.props.getPractitionerToDos(practitionerId, definition);
    }
  }

  getPractitionerId() {
    const { user } = this.props;
    const practitionerId = user && (user.role === CARE_COORDINATOR_ROLE_CODE) ? user.fhirResource.logicalId : null;
    return practitionerId;
  }

  handleFilter(dateRange) {
    const definition = TO_DO_DEFINITION;
    const practitionerId = this.getPractitionerId();

    if (practitionerId && dateRange) {
      this.props.getFilterToDos(practitionerId, definition, dateRange);
    }
  }
  render() {
    const { toDos, loading, dateRanges } = this.props;
    const filterField = {
      filterTypes: dateRanges,
      filterValueHintText: <FormattedMessage {...messages.selectLabelDateRange} />,
    };
    return (
      <div>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar
          showFilter={false}
          showToDoSpecificFilters
          filterField={filterField}
          onFilter={this.handleFilter}
        />
        {!loading && isEmpty(toDos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noToDosFound} />
        </NoResultsFoundText>}
        {!isEmpty(toDos) &&
        <div>
          <ToDoList
            isPractitioner
            toDos={toDos}
          />
        </div>
        }
      </div>
    );
  }
}

PractitionerToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  getPractitionerToDos: PropTypes.func.isRequired,
  getFilterToDos: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  dateRanges: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toDos: makeSelectPractitionerToDos(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
  dateRanges: makeSelectToDoFilterDateRanges(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([DATE_RANGE])),
    getPractitionerToDos: (practitionerId, definition) => dispatch(getPractitionerToDos(practitionerId, definition)),
    getFilterToDos: (practitionerId, definition, dateRange) => dispatch(getFilterToDos(practitionerId, definition, dateRange)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerToDos', reducer });
const withSaga = injectSaga({ key: 'practitionerToDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerToDos);
