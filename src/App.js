import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/visitors/Home";
import Login from "./pages/visitors/Login";
import PageNotFound from "./pages/visitors/PageNotFound";

// admin
import AddTimeLog from "./pages/admin/AddTimeLog";
import AddProject from "./pages/admin/AddProject";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageTimeLogs from "./pages/admin/ManageTimeLogs";

import { auth_token } from "./auth/auth";

// create a private route for admin
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth_token() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

// create a private route for admin
const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth_token() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin/add-time-log",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/company/:company" exact component={Home} />

        <LoginRoute path="/login" exact component={Login} />

        <AdminRoute path="/admin/add-time-log" exact component={AddTimeLog} />
        <AdminRoute path="/admin/add-project" exact component={AddProject} />
        <AdminRoute
          path="/admin/manage-projects"
          exact
          component={ManageProjects}
        />
        <AdminRoute
          path="/admin/manage-time-logs"
          exact
          component={ManageTimeLogs}
        />
        <Route path="*404" exact component={PageNotFound} />
        <Redirect to="404" />
      </Switch>
    </Router>
  );
}

export default App;
