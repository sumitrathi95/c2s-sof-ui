/**
 *
 * Consents
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell, Grid } from 'styled-css-grid';
import Add from '@material-ui/icons/Add';
import common from 'material-ui-next/colors/common';

import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ConsentCards from 'components/ConsentCards';
import StyledRaisedButton from 'components/StyledRaisedButton';
import makeSelectConsents from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getConsents } from './actions';

export class Consents extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.getConsents(DEFAULT_START_PAGE_NUMBER);
  }

  handlePageChange(currentPage) {
    this.props.getConsents(currentPage);
  }

  render() {
    const { consents } = this.props;
    const consentData = {
      loading: consents.loading,
      data: consents.data,
      currentPage: consents.currentPage,
      totalNumberOfPages: consents.totalNumberOfPages,
      currentPageSize: consents.currentPageSize,
      totalElements: consents.totalElements,
      handlePageClick: this.handlePageChange,
    };

    return (
      <Grid columns={1} gap="20px">
        <Cell center>
          <StyledRaisedButton component={Link} to="/c2s-sof-ui/manage-consent">
            <Add color={common.white} />
            <FormattedMessage {...messages.buttonLabelCreateNew} />
          </StyledRaisedButton>
        </Cell>
        <Cell>
          <ConsentCards consentData={consentData} />
        </Cell>
      </Grid>
    );
  }
}

Consents.propTypes = {
  getConsents: PropTypes.func.isRequired,
  consents: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    data: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
};

const mapStateToProps = createStructuredSelector({
  consents: makeSelectConsents(),
});

function mapDispatchToProps(dispatch) {
  return {
    getConsents: (pageNumber) => dispatch(getConsents(pageNumber)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'consents', reducer });
const withSaga = injectSaga({ key: 'consents', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Consents);
