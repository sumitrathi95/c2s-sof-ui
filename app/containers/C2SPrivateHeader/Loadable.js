/**
 *
 * Asynchronously loads the component for C2SPrivateHeader
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
