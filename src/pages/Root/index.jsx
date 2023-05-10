import { useSelector } from 'react-redux';
import Signup from '../Signup';
import Home from '../Home';

import { selectIsLoggedIn } from '../../actions/selectors';

function Root() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Home />;
  }
  return <Signup />;
}

export default Root;
