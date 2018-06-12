import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function OrganizationExpansionRowDetails({ organization }) {
  const { addresses, name, identifiers, telecoms, active } = organization;
  return (
    <InfoSection>
      <Grid columns={'60% 40%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderOrganization} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderId} />}
            text={identifiers}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderAddress} />}
            text={addresses}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderTelecom} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.tableColumnHeaderStatus} />}
            text={active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />
            }
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

OrganizationExpansionRowDetails.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
  }).isRequired,
};

export default OrganizationExpansionRowDetails;
