import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from '../screens/AdminHome';
import Post from '../screens/Post';
// import SearchTest from '../screens/SearchTest';
import Nav from '../components/Nav';
import Nodata from '../components/Nodata';
import Error from '../components/Error';
import Crud from '../screens/Crud';
import Bulkinsert from '../components/Bulkinsert';
import Loader from '../components/Loader';
import { getAllCategory, getAllSupplier } from '../services/AdminServices';
import { useEffect } from 'react';
import ViewScreens from '../screens/ViewScreens';
import { FaWindows } from 'react-icons/fa';

function RouteApp() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AdminHome} />
        <Route exact path='/Post' component={Crud} />
        {/* <Route path='/search' component={SearchTest} /> */}
        <Route path='/nav' component={Nav} />
        <Route path='/bulk' component={Loader} />
        <Route path='/View' component={ViewScreens} />
        <Route path='/nodata' component={Nodata} />
        <Route path='/error' component={Error} />
      </Switch>
    </Router>
  );
}

export default RouteApp;
