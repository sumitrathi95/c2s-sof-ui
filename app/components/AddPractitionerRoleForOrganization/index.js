/**
 *
 * AddPractitionerRoleForOrgnaization
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Close from '@material-ui/icons/Close';

import SearchBar from 'components/SearchBar';
import { fromBackendToFrontendOrganization } from 'components/OrganizationTable/mappings';
import PractitionerRoleForOrganizationTable from 'components/PractitionerRoleForOrganizationTable';
import StyledIconButton from 'components/StyledIconButton';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import H1 from 'components/H1';
import StyledTooltip from 'components/StyledTooltip';
import messages from './messages';


function AddPractitionerRoleForOrgnaization(props) {
  const { organizations, currentPage, totalNumberOfPages, onSearch, onPageClick, onAddAssociateOrganization, existingOrganizations, callback, roleType, specialtyType } = props;
  return (
    <div>
      <StyledTooltip title="Close">
        <StyledIconButton onClick={callback}>
          <Close />
        </StyledIconButton>
      </StyledTooltip>
      <H1>{<FormattedMessage {...messages.header} />}</H1>
      <SearchBar onSearch={onSearch} />

      {organizations.loading && <RefreshIndicatorLoading />}

      {(!organizations.loading && organizations.data && organizations.data.length > 0 &&
        <div>
          <PractitionerRoleForOrganizationTable
            organizations={organizations.data.map(fromBackendToFrontendOrganization)}
            onAddAssociateOrganization={onAddAssociateOrganization}
            existingOrganizations={existingOrganizations}
            callback={callback}
            roleType={roleType}
            specialtyType={specialtyType}

          />
          <CenterAlignedUltimatePagination
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            onChange={onPageClick}
          />
        </div>
      ) ||
      ((!organizations.loading && organizations.data && organizations.data.length === 0 &&
        <CenterAlign>
          <span>No organizations found</span>
        </CenterAlign>))
      }
    </div>
  );
}

AddPractitionerRoleForOrgnaization.propTypes = {
  onPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAddAssociateOrganization: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  existingOrganizations: PropTypes.array,
  callback: PropTypes.func,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default AddPractitionerRoleForOrgnaization;
