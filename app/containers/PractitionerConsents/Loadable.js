/**
 *
 * Asynchronously loads the component for PractitionerConsents
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
