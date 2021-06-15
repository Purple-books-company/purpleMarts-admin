import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminHome from '../screens/AdminHome';

// import SearchTest from '../screens/SearchTest';
import Nav from '../components/Nav';
import Nodata from '../components/Nodata';
import Error from '../components/Error';
import Crud from '../screens/Crud';

import Loader from '../components/Loader';

import ViewScreens from '../screens/ViewScreens';

import ProductEditScreen from '../screens/ProductEditScreen';
import TestView from "../components/TestView"


function RouteApp() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={AdminHome} />
        <Route exact path='/Post' component={Crud} />
        {/* <Route path='/search' component={SearchTest} /> */}
        <Route path='/nav' component={Nav} />
        <Route path='/bulk' component={TestView} />
        <Route path='/View' component={ViewScreens} />

        <Route path='/nodata' component={Nodata} />
        

        <Route path='/editproduct' component={ProductEditScreen} />
        <Route  component={Error} />
      </Switch>
    </Router>
  );
}

export default RouteApp;
