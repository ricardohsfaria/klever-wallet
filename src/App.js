import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Home from '../src/pages/Home';
import AddToken from './pages/AddToken';

function App() {
  return (
    <ContextProvider>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add-token" component={AddToken} />
    </Switch>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
