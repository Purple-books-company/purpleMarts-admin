import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from '../screens/AdminHome';
import Post from '../screens/Post';

function RouteApp() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AdminHome} />
        <Route exact path='/Post' component={Post} />
      </Switch>
    </Router>
  );
}

export default RouteApp;
