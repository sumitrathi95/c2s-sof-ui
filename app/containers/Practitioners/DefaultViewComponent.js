import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { combineAddress, mapToTelecoms } from 'containers/App/helpers';
import { MANAGE_PRACTITIONER_URL, OCP_ADMIN_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE } from 'containers/App/constants';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import PractitionerTable from 'components/PractitionerTable';
import messages from './messages';

class DefaultViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
    };
    this.onSize = this.onSize.bind(this);
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_PRACTITIONER_URL,
    };
    const { onSearch, flattenPractitionerData, practitionersData } = this.props;
    return (
      <div>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[OCP_ADMIN_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE]}
          onSearch={onSearch}
          onSize={this.onSize}
        />
        <InfoSection margin="0 0 10px 0">
          <PractitionerTable
            relativeTop={this.state.relativeTop}
            practitionersData={practitionersData}
            flattenPractitionerData={flattenPractitionerData}
            combineAddress={combineAddress}
            mapToTelecoms={mapToTelecoms}
          />
        </InfoSection>
      </div>
    );
  }
}

DefaultViewComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  flattenPractitionerData: PropTypes.func.isRequired,
  practitionersData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      active: PropTypes.bool,
      name: PropTypes.array,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
      practitionerRoles: PropTypes.array,
    })).isRequired,
  }),
};

export default DefaultViewComponent;
