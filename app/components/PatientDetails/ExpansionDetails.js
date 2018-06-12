import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import upperFirst from 'lodash/upperFirst';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import AdvisoryDetails from './AdvisoryDetails';
import messages from './messages';

function ExpansionDetails({ patient }) {
  const { addresses, name, genderCode, identifier, telecoms, birthDate, flags } = patient;
  return (
    <Grid columns={'70% 30%'} justifyContent="space-between">
      <Cell>
        <InfoSection>
          <Grid columns={'repeat(4, 1fr)'} justifyContent="space-between">
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsFirstName} />}
                text={name}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsLastName} />}
                text={name}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.gender} />}
                text={upperFirst(genderCode)}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsIdentifiers} />}
                text={identifier}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsAddresses} />}
                text={addresses}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.contacts} />}
                text={telecoms}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsDOB} />}
                text={birthDate}
              />
            </Cell>
          </Grid>
        </InfoSection>
      </Cell>
      {flags.length > 0 &&
      <AdvisoryDetails flags={flags} />
      }
    </Grid>
  );
}

ExpansionDetails.propTypes = {
  patient: PropTypes.shape({
    identifier: PropTypes.string,
    genderCode: PropTypes.string,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    birthDate: PropTypes.string,
    flags: PropTypes.array,
  }).isRequired,
};

export default ExpansionDetails;
