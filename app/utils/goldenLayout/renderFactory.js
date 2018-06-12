import ReactDOM from 'react-dom';
import withContext from '../../utils/withContext';

export default function renderFactory(Component) {
  return function renderComponent(location) {
    ReactDOM.render(
      withContext(Component),
      document.getElementById(location)
    );
  };
}
