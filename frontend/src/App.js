import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
