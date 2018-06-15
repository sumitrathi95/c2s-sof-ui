/**
 *
 * Asynchronously loads the component for LogoutPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
