import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from 'material-ui-next/Avatar';
import teal from 'material-ui-next/colors/teal';
import upperFirst from 'lodash/upperFirst';

import InfoSection from 'components/InfoSection';
import StyledChip from 'components/StyledChip';
import messages from './messages';

function ConsentExpansionRowDetails(props) {
  const { purpose } = props;
  return (
    <InfoSection>
      <div><FormattedMessage {...messages.purpose} /></div>
      {purpose.map((pou) => (
        <StyledChip
          key={pou.code}
          label={upperFirst(pou.display)}
          avatar={
            <Avatar>
              <CheckCircleIcon color={teal['500']} />
            </Avatar>
          }
        />
      ))
      }
    </InfoSection>
  );
}

ConsentExpansionRowDetails.propTypes = {
  purpose: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })).isRequired,
};

export default ConsentExpansionRowDetails;
