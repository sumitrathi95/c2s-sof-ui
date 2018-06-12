import { Grid } from 'styled-css-grid';

const ManagePatientFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "contextGroup"
    "firstName"
    "lastName"
    "birthDate"
    "genderCode"
    "birthSex"
    "race"
    "ethnicity"
    "language"
    "identifierGroup"
    "addresses"
    "contacts"
    "flags"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "contextGroup contextGroup"
      "firstName lastName"
      "birthDate genderCode"
      "birthSex race"
      "ethnicity language"
      "identifierGroup identifierGroup"
      "contacts contacts"
      "addresses addresses"
      "flags flags"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup"
      "firstName firstName firstName firstName lastName lastName lastName lastName . . . ."
      "birthDate birthDate birthDate birthDate genderCode genderCode birthSex birthSex . . . ."
      "race race ethnicity ethnicity ethnicity language language . . . . ."
      "identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . ."
      "contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"
      "addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses"
      "flags flags flags flags flags flags flags flags flags flags flags flags"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManagePatientFormGrid.propTypes = Grid.propTypes;

export default ManagePatientFormGrid;
