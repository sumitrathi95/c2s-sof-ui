/**
*
* TodoCardGrid
*
*/

import { Grid } from 'styled-css-grid';

const ToDoCardGrid = Grid.extend`
  color: #444;
  width: auto;
  margin: 0 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
`;

ToDoCardGrid.propTypes = {};

export default ToDoCardGrid;
