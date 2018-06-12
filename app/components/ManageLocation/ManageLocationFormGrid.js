import { Grid } from 'styled-css-grid';

const ManageLocationFormGrid = Grid.extend`
  padding-left: 1vw;
  padding-right: 1vw;
  margin: 0 1vw;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "organizationName"
    "name"
    "status"
    "locationGroup"
    "identifierGroup"
    "contact"
    "address1"
    "address2"
    "city"
    "state"
    "postalCode"
    "addressUse"
    "buttonGroup"
    "errorMessage";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "organizationName organizationName"
      "name status"
      "locationGroup locationGroup"
      "identifierGroup identifierGroup"
      "identifierGroup identifierGroup"
      "contact contact"
      "address1 address2"
      "city state"
      "postalCode addressUse"
      "buttonGroup ."
      "errorMessage errorMessage";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName"
      "name name name name status status status . . . . ."
      "locationGroup locationGroup locationGroup locationGroup locationGroup locationGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup"
      "contact contact contact contact contact contact contact contact contact contact contact contact"
      "address1 address1 address1 address1 address2 address2 address2 address2 . . . ."
      "city city city city state state state postalCode postalCode . . ."
      "addressUse addressUse addressUse addressUse . . . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."
      "errorMessage errorMessage . . . . . . . . . .";
  }
`;

ManageLocationFormGrid.propTypes = {};

export default ManageLocationFormGrid;
