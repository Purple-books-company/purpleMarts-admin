import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import AdminHome from '../screens/AdminHome';

// import SearchTest from '../screens/SearchTest';
import Nav from '../components/Nav';
import Nodata from '../components/Nodata';
import Error from '../components/Error';
import Crud from '../screens/Crud';

import Loader from '../components/Loader';

import ViewScreens from '../screens/ViewScreens';

import ProductEditScreen from '../screens/ProductEditScreen';
// import TestView from "../components/TestView";
import Login from '../screens/login';
import { useEffect, useState } from 'react';
import { decrypt, encrypt } from '../services/encrypt';
import { CenterAlign } from '../styles/styled';
import OffersMain from '../screens/OffersMain';

function RouteApp() {
  const [login, setLogin] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    let isLogin = localStorage.getItem('login');

    if (isLogin !== null || isLogin !== undefined) {
      let decrypted = decrypt(isLogin);
      if (decrypted !== null && decrypted !== '') {
        console.log(decrypted);
        setLogin(true);
      } else {
        console.log('never');
      }
    }
    setLoader(false);
  }, []);
  function setAuth(email) {
    let encrypted = encrypt(email);

    if (email === 'testAdmin@gmail.com') {
      localStorage.setItem('login', encrypted);
      setLogin(true);
    } else {
      alert('Not autorized');
    }
  }
  function logOut() {
    localStorage.removeItem('login');
    setLogin(false);
  }

  return (
    <>
      {loader ? (
        <>
          <CenterAlign>
            <Loader />
          </CenterAlign>
        </>
      ) : (
        <Router>
          {!login ? (
            <Switch>
              <Route component={() => <Login login={setAuth} />} />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path='/'
                component={() => {
                  return <AdminHome logout={logOut} />;
                }}
              />

              <Route exact path='/Post' component={Crud} />
              <Route exact path='/nav' component={Nav} />
              <Route exact path='/offer' component={OffersMain} />
              <Route exact path='/bulk' component={Loader} />
              <Route exact path='/View' component={ViewScreens} />

              <Route exact path='/nodata' component={Nodata} />

              <Route exact path='/editproduct' component={ProductEditScreen} />
              <Route path='*' component={Error} />
            </Switch>
          )}
        </Router>
      )}
    </>
  );
}

export default RouteApp;
