import { Grid } from 'styled-css-grid';

const ManageAppointmentFormGrid = Grid.extend`
  width: auto;
  margin: 1vh 1vw;
  grid-row-gap: 0.5vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "selectedPatient"
    "description"
    "date"
    "startTime"
    "endTime"
    "appointmentStatus"
    "appointmentType"
    "participantSubtitle"
    "addParticipant"
    "selectedParticipants"
    "buttonGroup";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "selectedPatient selectedPatient"
      "description"
      "date"
      "startTime"
      "endTime"
      "appointmentStatus"
      "appointmentType"
      "participantSubtitle participantSubtitle"
      "addParticipant ."
      "selectedParticipants selectedParticipants"
      "buttonGroup .";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient"
      "description description description description date date date date date . . ."
      "startTime startTime endTime endTime . . . . . . . ."
      "appointmentType appointmentType appointmentType appointmentStatus appointmentStatus . . . . . . ."
      "participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle"
      "addParticipant addParticipant . . . . . . . . . ."
      "selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants"
      "buttonGroup buttonGroup buttonGroup . . . . . . . . .";
  }
`;

ManageAppointmentFormGrid.propTypes = {};

export default ManageAppointmentFormGrid;
