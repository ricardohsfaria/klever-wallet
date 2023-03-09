import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Home from '../src/pages/Home';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';

function App() {
  return (
    <ContextProvider>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/add-token" component={ AddToken } />
      <Route exact path="/edit-token/:id" component={ EditToken } />
    </Switch>
    </ContextProvider>
  );
}

export default App;
