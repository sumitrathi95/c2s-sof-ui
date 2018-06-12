/**
 *
 * Consent2ShareHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import PatientBanner from './PatientBanner';
import PatientInfoPanel from './PatientInfoPanel';
import CareTeamPanel from './CareTeamPanel';
import ConsentPanel from './ConsentPanel';
import SegmentHealthRecordPanel from './SegmentHealthRecordPanel';
import ActivityHistoryPanel from './ActivityHistoryPanel';


function Consent2ShareHome(props) {
  return (
    <Page color="secondary">
      <PatientBanner patient={props.patient} />
      <PatientInfoPanel />
      <CareTeamPanel />
      <ConsentPanel />
      <SegmentHealthRecordPanel />
      <ActivityHistoryPanel />
    </Page>
  );
}

Consent2ShareHome.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }).isRequired,
};

export default Consent2ShareHome;
