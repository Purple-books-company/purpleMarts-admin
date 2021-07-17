import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import AdminHome from "../screens/AdminHome";

// import SearchTest from '../screens/SearchTest';
import Nav from "../components/Nav";
import Nodata from "../components/Nodata";
import Error from "../components/Error";
import Crud from "../screens/Crud";

import Loader from "../components/Loader";

import ViewScreens from "../screens/ViewScreens";

import ProductEditScreen from "../screens/ProductEditScreen";
// import TestView from "../components/TestView";
import Login from "../screens/login";
import { useEffect, useState } from "react";
import { decrypt, encrypt } from "../services/encrypt";
import { CenterAlign } from "../styles/styled";
import OffersMain from "../screens/OffersMain";
import SingleProductView from "../components/ViewScreenComponents/SingleProductView";
import OrdersView from "../components/ViewScreenComponents/OrdersView";
import SpecificOrder from "../components/ViewScreenComponents/SpecificOrder";
import Invoice from "../components/ViewScreenComponents/Invoice";
import Bill from "../components/ViewScreenComponents/Bill";

function RouteApp() {

  const [orders, setOrders] = useState(
  [
    {
        customerId: "cus12345678910",
        customerName: "Reahaan Sheriff",
        customerEmail: "reahaan@gmail.com",
        orderId: "ord1111pppppppppp",
        orderDate: "01 May 2021 12:40 PM",
        orderStatus: "ordered",
        trackId: "track112287657",
        trackUrl: "aaabbaa.coms]qa",
        deliveryDate: "08 May 2021",
        cod: false,
        products: [
            {
                productId: "prod1234567890",
                productName: "Headphone",
                buyingPrice: 1000,
                quantity:2,
            },
            {
                productId: "prod1234567891",
                productName: "charger",
                buyingPrice: 2000,
                quantity:2,
            },
            {
                productId: "prod1234567892",
                productName: "mobile",
                buyingPrice: 10000,
                quantity:7,
            }
        ],
        address: [
            {
                street: "20 East Cemetry Road",
                city: "chennai",
                state: "Tamilnadu",
                mobile: 9998877654,
                pincode:600110
            }
        ]
    },
    {
        customerId: "cus12345678911",
        customerName: "Mohammed",
        customerEmail: "mohammed@gmail.com",
        orderId: "ord1111pkkkkkkpq",
        orderDate: "01 June 2021 12:40 PM",
        orderStatus: "ordered",
        trackId: "track112287657",
        trackUrl: "aaabbaa.coms]qa",
        deliveryDate: "08 June 2021",
        cod: true,
        products: [
            {
                productId: "prod1234567890",
                productName: "Case",
                buyingPrice: 1000,
                quantity:2,
            },
            {
                productId: "prod1234567891",
                productName: "Power bank",
                buyingPrice: 2000,
                quantity:2,
            },
            {
                productId: "prod1234567892",
                productName: "laptop",
                buyingPrice: 10000,
                quantity:5,
            },
            {
                productId: "prod1234567892",
                productName: "laptop",
                buyingPrice: 10000,
                quantity:2,
            }
        ],
        address: [
            {
                street: "10 Raman salai",
                city: "chennai",
                state: "Tamilnadu",
                mobile: 9998877655,
                pincode:600110
            }
        ]
    },
    {
        customerId: "cus12345678912",
        customerName: "Mohammed",
        customerEmail: "mohammed@gmail.com",
        orderId: "ord1111ttttttttpppq",
        orderDate: "01 June 2021 12:40 PM",
        orderStatus: "ordered",
        trackId: "track112287657",
        trackUrl: "aaabbaa.coms]qa",
        deliveryDate: "08 June 2021",
        cod: true,
        products: [
            {
                productId: "prod1234567890",
                productName: "Case",
                buyingPrice: 1000,
                quantity:3,
            },
            {
                productId: "prod1234567891",
                productName: "Power bank",
                buyingPrice: 2000,
                quantity:2,
            },
            {
                productId: "prod1234567892",
                productName: "laptop",
                buyingPrice: 10000,
                quantity:2,
            },
            {
                productId: "prod1234567892",
                productName: "laptop",
                buyingPrice: 10000,
                quantity:1,
            }
        ],
        address: [
            {
                street: "10 Raman salai",
                city: "chennai",
                state: "Tamilnadu",
                mobile: 9998877655,
                pincode:600110
            }
        ]
    }
  ]
    );

    const addUrl = (tid,url) =>{
      alert("added");
    
    }

  const [login, setLogin] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    let isLogin = localStorage.getItem("login");

    if (isLogin !== null || isLogin !== undefined) {
      let decrypted = decrypt(isLogin);
      if (decrypted !== null && decrypted !== "") {
        console.log(decrypted);
        setLogin(true);
      } else {
        console.log("never");
      }
    }
    setLoader(false);
  }, []);
  function setAuth(email) {
    let encrypted = encrypt(email);

    if (email === "testAdmin@gmail.com") {
      localStorage.setItem("login", encrypted);
      setLogin(true);
    } else {
      alert("Not autorized");
    }
  }
  function logOut() {
    localStorage.removeItem("login");
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
                path="/"
                component={() => {
                  return <AdminHome logout={logOut} />;
                }}
              />

              <Route exact path="/Post" component={Crud} />
              <Route exact path="/nav" component={Nav} />
              <Route exact path="/offer" component={OffersMain} />
              <Route exact path="/bulk" component={Loader} />
              <Route exact path="/View" component={ViewScreens} />

              <Route exact path="/nodata" component={Nodata} />

              <Route exact path="/product" component={SingleProductView} />

              <Route exact path="/editproduct" component={ProductEditScreen} />
              <Route exact path="/orders">
                <OrdersView orders={orders}/>
              </Route>
              <Route exact path="/specific/:id">
                <SpecificOrder orders={orders} addUrl={addUrl}/>  
              </Route>
              <Route exact path="/invoice/:id">
                <Invoice orders={orders}/>  
              </Route>
              <Route exact path='/bill' component={Bill}/>
              <Route path="*" component={Error} />
            </Switch>
          )}
        </Router>
      )}
    </>
  );
}

export default RouteApp;
