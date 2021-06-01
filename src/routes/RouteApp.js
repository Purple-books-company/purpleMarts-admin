import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from '../screens/AdminHome';

function RouteApp() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AdminHome} />
      </Switch>
    </Router>
  );
}

export default RouteApp;
