/**
 *
 * Asynchronously loads the component for PermissionAssignmentTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
