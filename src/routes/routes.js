import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//import service auth
import { isAuthenticated } from '../services/auth';

//import components master
import signin from '../pages/MasterAdministrator/SigninMaster';
import DashboardHome from '../pages/MasterAdministrator/DashboardHome';
import RegisterCampus from '../pages/MasterAdministrator/Register/RegisterCampus';

const PrivateRouteMaster = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/master/signin', state: { from: props.location } }} />
        )
    )}
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/master/signin" component={signin} />
      <PrivateRouteMaster exact path="/master/home" component={DashboardHome} />
      <PrivateRouteMaster exact path="/master/registerCampus" component={RegisterCampus} />

      <Route path="*" component={() => <h1>Error</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;