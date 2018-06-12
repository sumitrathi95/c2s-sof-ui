import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import teal from 'material-ui-next/colors/teal';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import HealthcareServices from 'containers/HealthcareServices';
import ControlledAccordion from 'components/ControlledAccordion';
import FullWidthPanelDetails from 'components/ControlledAccordion/FullWidthPanelDetails';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import StyledText from 'components/StyledText';
import PanelSection from 'components/PanelSection';
import messages from './messages';


function OrganizationSliderServices() {
  return (
    <PanelSection>
      <ControlledAccordion
        accordionTitle={
          <StyledText whiteSpace>
            <FormattedMessage {...messages.servicesPanel.panelSummary} />
          </StyledText>
        }
        expandIcon={
          <StyledTooltip title={<FormattedMessage {...messages.addNew} />}>
            <StyledIconButton component={Link} to={'/ocp-ui/manage-healthcare-service'} disableIconHover>
              <AddCircleIcon color={teal['500']} />
            </StyledIconButton>
          </StyledTooltip>
        }
      >
        <FullWidthPanelDetails>
          <HealthcareServices showActionSection={false} />
        </FullWidthPanelDetails>
      </ControlledAccordion>
    </PanelSection>
  );
}

OrganizationSliderServices.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
  }).isRequired,
};

export default OrganizationSliderServices;
