import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminHome from "../screens/AdminHome";
import Post from "../screens/Post";
import SearchTest from "../screens/SearchTest";

function RouteApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AdminHome} />
        <Route exact path="/Post" component={Post} />
        <Route path="/search" component={SearchTest} />
      </Switch>
    </Router>
  );
}

export default RouteApp;
