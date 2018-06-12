/**
 *
 * CareTeamTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import sizeMeHOC from 'utils/SizeMeUtils';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import {
  EXPANDED_TABLE_COLUMNS,
  SUMMARIZED_TABLE_COLUMNS,
} from 'components/CareTeamTable/constants';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';

function CareTeamTable({ elements, relativeTop, manageCareTeamUrl, isExpanded }) {
  function createTableHeaders() {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategories} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderParticipantsAndRoles} /></TableHeaderColumn>
        }
        { isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStartDate} /></TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderEndDate} /></TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderReason} /></TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(id, name, statusDisplay, categoryDisplay, participants, startDate, endDate, reasonDisplay, menuItems) {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    return (
      <TableRow key={id} columns={columns}>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{statusDisplay}</TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{categoryDisplay}</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn>
          {!isEmpty(participants) && participants
            .map(({ memberId, memberFirstName, memberLastName, memberName, roleDisplay }) => (
              <div key={memberId}>
                {`${[memberFirstName, memberLastName, memberName].filter((value) => !isEmpty(value)).join(' ')}${isEmpty(roleDisplay) ? '' : ` / ${roleDisplay}`}`}
              </div>))
          }
        </TableRowColumn>
        }
        { isExpanded &&
        <TableRowColumn>{startDate}</TableRowColumn>
        }
        <TableRowColumn>{endDate}</TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{reasonDisplay}</TableRowColumn>
        }
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </TableRow>
    );
  }
  return (
    <div>
      <Table>
        {createTableHeaders()}
        {!isEmpty(elements) && elements.map(({ id, name, statusDisplay, categoryDisplay, participants, subjectId, startDate, endDate, reasonDisplay }) => {
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.menuItemEdit} />,
            linkTo: {
              pathname: `${manageCareTeamUrl}/${id}`,
              search: `?patientId=${subjectId}`,
            },
          }, {
            primaryText: <FormattedMessage {...messages.menuItemRemove} />,
            disabled: true,
          }];
          return createTableRows(id, name, statusDisplay, categoryDisplay, participants, startDate, endDate, reasonDisplay, menuItems);
        })}
      </Table>
    </div>
  );
}

CareTeamTable.propTypes = {
  isExpanded: PropTypes.bool,
  relativeTop: PropTypes.number.isRequired,
  manageCareTeamUrl: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    reasonCode: PropTypes.string,
    reasonDisplay: PropTypes.string,
    statusCode: PropTypes.string,
    statusDisplay: PropTypes.string,
    categoryCode: PropTypes.string,
    categoryDisplay: PropTypes.string,
    subjectId: PropTypes.string.isRequired,
    subjectFirstName: PropTypes.string.isRequired,
    subjectLastName: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.shape({
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
      memberId: PropTypes.string.isRequired,
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      memberName: PropTypes.string,
      memberType: PropTypes.string.isRequired,
      onBehalfOfId: PropTypes.string,
      onBehalfOfName: PropTypes.string,
    })),
  })),
};

export default sizeMeHOC(CareTeamTable);
