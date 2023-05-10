import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Root from '../Root';

import './styles.css';
const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" Component={Root} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
