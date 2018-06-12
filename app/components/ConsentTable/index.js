/**
 *
 * ConsentTable
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import capitalize from 'lodash/capitalize';

import sizeMeHOC from 'utils/SizeMeUtils';
import RecordsRange from 'components/RecordsRange';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StyledText from 'components/StyledText';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import ExpansionTableRow from 'components/ExpansionTableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import { flattenConsentData } from 'components/ConsentCard/helpers';
import ConsentNavigationIconMenu from './ConsentNavigationIconMenu';
import ConsentExpansionRowDetails from './ConsentExpansionRowDetails';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH } from './constants';
import messages from './messages';


function ConsentTable(props) {
  const { consentData, relativeTop, allowedAttestConsentRoles, size } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
  return (
    <div>
      {consentData.loading && <RefreshIndicatorLoading />}
      {(!consentData.loading && consentData.data && consentData.data.length > 0 ?
        <div>
          <Table>
            <TableHeader columns={columns} relativeTop={relativeTop}>
              <TableHeaderColumn />
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPatientName} /></TableHeaderColumn>
              }
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderFromActor} /></TableHeaderColumn>
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderToActor} /></TableHeaderColumn>
              }
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPeriod} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
            </TableHeader>
            {!isEmpty(consentData.data) && consentData.data.map((consent) => {
              const { logicalId, patient, status, period, fromGeneralDesignation, toGeneralDesignation, purpose } = consent;
              const flattenedConsent = consent && flattenConsentData(consent);
              return (
                <ExpansionTableRow
                  expansionTableRowDetails={<ConsentExpansionRowDetails purpose={purpose} />}
                  key={logicalId}
                  columns={columns}
                >
                  {isExpanded &&
                  <TableRowColumn>{patient && patient.display}</TableRowColumn>
                  }
                  <TableRowColumn>{fromGeneralDesignation || (flattenedConsent && flattenedConsent.fromActor.map(({ display }) => (
                    <StyledText key={uniqueId()}>{display}</StyledText>
                  )))}
                  </TableRowColumn>
                  {isExpanded &&
                  <TableRowColumn>{toGeneralDesignation || (flattenedConsent && flattenedConsent.toActor.map(({ display }) => (
                    <StyledText key={uniqueId()}>{display}</StyledText>
                  )))}
                  </TableRowColumn>
                  }
                  <TableRowColumn>{period && period.start}-{period && period.end} </TableRowColumn>
                  <TableRowColumn>{capitalize(status)}</TableRowColumn>
                  <TableRowColumn>
                    <ConsentNavigationIconMenu
                      consent={consent}
                      allowedAttestConsentRoles={allowedAttestConsentRoles}
                    />
                  </TableRowColumn>
                </ExpansionTableRow>
              );
            })}
          </Table>
          {!!consentData && !!consentData.currentPage &&
          <div>
            <CenterAlignedUltimatePagination
              currentPage={consentData.currentPage}
              totalPages={consentData.totalNumberOfPages}
              onChange={consentData.handlePageClick}
            />
            <RecordsRange
              currentPage={consentData.currentPage}
              totalPages={consentData.totalNumberOfPages}
              totalElements={consentData.totalElements}
              currentPageSize={consentData.currentPageSize}
            />
          </div>}
        </div> : (
          <CenterAlign>
            <NoResultsFoundText>No consents found.</NoResultsFoundText>
          </CenterAlign>
        ))}
    </div>
  );
}

ConsentTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  allowedAttestConsentRoles: PropTypes.string,
  consentData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      status: PropTypes.string,
      fromActor: PropTypes.array,
      toActor: PropTypes.array,
      period: PropTypes.shape({
        start: PropTypes.date,
        end: PropTypes.date,
      }),
    })).isRequired,
  }),
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(ConsentTable);
