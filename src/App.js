import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Home from '../src/pages/Home';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';

function App() {
  return (
    <ContextProvider>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add-token" component={AddToken} />
      <Route exact path="/edit-token:/id-do-token" component={EditToken} />
    </Switch>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
