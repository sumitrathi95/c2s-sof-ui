/**
 *
 * Asynchronously loads the component for C2SLayout
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
