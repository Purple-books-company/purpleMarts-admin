import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from '../screens/AdminHome';
import Post from '../screens/Post';
import SearchTest from '../screens/SearchTest';
import Nav from '../screens/Nav';
import Crud from '../screens/Crud';
import Bulkinsert from '../components/Bulkinsert';

function RouteApp() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AdminHome} />
        <Route exact path='/Post' component={Crud} />
        <Route path='/search' component={SearchTest} />
        <Route path='/nav' component={Nav} />
        <Route path='/bulk' component={Bulkinsert} />
      </Switch>
    </Router>
  );
}

export default RouteApp;
