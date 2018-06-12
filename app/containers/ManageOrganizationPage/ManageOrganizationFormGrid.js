import { Grid } from 'styled-css-grid';

const ManageOrganizationFormGrid = Grid.extend`
  color: #444;
  width: auto;
  padding-left: 0.5vw;
  margin: 0 1vw;

  /* grid specific properties */
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
`;

ManageOrganizationFormGrid.propTypes = {};

export default ManageOrganizationFormGrid;
