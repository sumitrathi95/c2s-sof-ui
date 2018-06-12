/**
 *
 * Asynchronously loads the component for Consent2ShareHomePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
