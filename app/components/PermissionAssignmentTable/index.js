/**
*
* PermissionAssignmentTable
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { PERMISSION_ASSIGNMENT_TABLE_COLUMNS } from './constants';

// import styled from 'styled-components';
const elements = [
  { logicalId: '1', providerName: 'Lee Coordinator', role: 'PCP', permissionGroup: 'Care Manager', contact: '339-111-1111' },
  { logicalId: '2', providerName: 'William Coordinator', role: 'PCP', permissionGroup: 'Care Coordinator', contact: '413-812-3141' },
  { logicalId: '3', providerName: 'David Coordinator', role: 'PCP', permissionGroup: 'Care Manager', contact: '552-131-8913' },
  { logicalId: '4', providerName: 'Alice Coordinator', role: 'PCP', permissionGroup: 'Administrator', contact: '339-121-1476' },
  { logicalId: '5', providerName: 'Michael Coordinator', role: 'PCP', permissionGroup: 'Care Manager', contact: '421-321-1561' },
];

const columns = PERMISSION_ASSIGNMENT_TABLE_COLUMNS;
const menuItems = [{
  primaryText: <FormattedMessage {...messages.viewDetails} />,
  disabled: true,
},
];

function createTableHeaders() {
  return (
    <TableHeader columns={columns}>
      <TableHeaderColumn><FormattedMessage {...messages.providerName} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.role} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.contact} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
    </TableHeader>
  );
}

function createTableRows() {
  return (
    <div>
      {elements && elements.map((permissionAssignment) => (
        <TableRow key={permissionAssignment.logicalId} columns={columns}>
          <TableRowColumn>
            {permissionAssignment.providerName}
          </TableRowColumn>
          <TableRowColumn>
            {permissionAssignment.role}
          </TableRowColumn>
          <TableRowColumn>
            {permissionAssignment.permissionGroup}
          </TableRowColumn>
          <TableRowColumn>
            {permissionAssignment.contact}
          </TableRowColumn>
          <TableRowColumn>
            <NavigationIconMenu menuItems={menuItems} />
          </TableRowColumn>
        </TableRow>
      ))}
    </div>
  );
}

class PermissionAssignmentTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Table>
        {createTableHeaders()}
        {createTableRows()}
      </Table>
    );
  }
}

PermissionAssignmentTable.propTypes = {

};

export default PermissionAssignmentTable;
