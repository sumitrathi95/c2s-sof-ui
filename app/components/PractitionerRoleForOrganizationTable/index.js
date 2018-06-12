/**
 *
 * PractitionerRoleForOrganizationTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { Form, Formik } from 'formik';
import SelectField from 'components/SelectField';
import yup from 'yup';
import messages from './messages';


const tableColumns = '1fr 1fr 1.5fr .5fr 2fr 2fr 1fr';

function renderIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => (<div key={uniqueId()}>{identifier.systemDisplay}</div>));
}

function findExistingOrganization(reference, existingOrganizations) {
  return find(existingOrganizations, ['organization.reference', reference]);
}

function createSearchResultRows(organizations, onAddAssociateOrganization, existingOrganizations, callback, roleType, specialtyType) {
  return organizations.map((org) => (
    <Formik
      key={org.id}
      initialValues={findExistingOrganization(`Organization/${org.id}`, existingOrganizations)}
      onSubmit={(values, actions) => {
        const { code, specialty } = values;
        actions.setSubmitting(false);
        onAddAssociateOrganization({
          organization: { reference: `Organization/${org.id}`, display: `${org.name}` },
          code,
          specialty,
          active: true,
        });
        callback();
      }}
      validationSchema={yup.object().shape({
        code: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
        specialty: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
      })}
      render={(formikProps) => {
        const { name, address, id, identifiers, status } = org;
        const { isSubmitting, dirty, isValid } = formikProps;
        return (
          <Form>
            <Table>
              <TableRow key={id}>
                <TableRow
                  columns={tableColumns}
                  key={id}
                  role="button"
                  tabIndex="0"
                >
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{address}</TableRowColumn>
                  <TableRowColumn>{renderIdentifiers(identifiers)}</TableRowColumn>
                  <TableRowColumn>{status}</TableRowColumn>
                  <TableRowColumn>
                    <SelectField
                      fullWidth
                      name={'code'}
                      hintText={<FormattedMessage {...messages.hint.code} />}
                    >
                      {roleType && roleType.map((rt) =>
                        (<MenuItem
                          key={rt.code}
                          value={rt.code}
                          primaryText={rt.display}
                        />),
                      )}
                    </SelectField>
                  </TableRowColumn>
                  <TableRowColumn>
                    <SelectField
                      fullWidth
                      name="specialty"
                      hintText={<FormattedMessage {...messages.hint.specialty} />}
                    >
                      {specialtyType && specialtyType.map((rt) =>
                        (<MenuItem
                          key={rt.code}
                          value={rt.code}
                          primaryText={rt.display}
                        />),
                      )}
                    </SelectField>
                  </TableRowColumn>
                  <TableRowColumn>
                    <StyledRaisedButton
                      type="submit"
                      value={org}
                      disabled={!dirty || isSubmitting || !isValid || findExistingOrganization(`Organization/${org.id}`, existingOrganizations) !== undefined}
                    >
                      Add
                    </StyledRaisedButton>
                  </TableRowColumn>
                </TableRow>
              </TableRow>
            </Table>
          </Form>
        );
      }}
    />
  ));
}

function PractitionerRoleForOrganizationTable(props) {
  const { organizations, onAddAssociateOrganization, existingOrganizations, callback, roleType, specialtyType } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCode} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
      </Table>
      {!isEmpty(organizations) && organizations.length > 0 && createSearchResultRows(organizations, onAddAssociateOrganization, existingOrganizations, callback, roleType, specialtyType)}
    </div>
  );
}

PractitionerRoleForOrganizationTable.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onAddAssociateOrganization: PropTypes.func,
  existingOrganizations: PropTypes.array,
  callback: PropTypes.func,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default PractitionerRoleForOrganizationTable;
