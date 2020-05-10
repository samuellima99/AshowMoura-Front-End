import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//import service auth
import { isAuthenticated } from '../services/auth';

//import components administrator master
import signin from '../pages/MasterAdministrator/SigninMaster';
import DashboardHome from '../pages/MasterAdministrator/Home'
import RegisterCampus from '../pages/MasterAdministrator/Register/RegisterCampus';
import ListCampus from '../pages/MasterAdministrator/List/ListCampus';
import editCampus from '../pages/MasterAdministrator/Edit/EditCampus';
import RegisterAdmin from '../pages/MasterAdministrator/Register/RegisterAdmin';
import ListAdmins from '../pages/MasterAdministrator/List/ListAdmins';
import EditAdmins from '../pages/MasterAdministrator/Edit/EditAdmin';
import ListAssingUserGroup from '../pages/MasterAdministrator/List/ListAssignUserGroup';
import AssingGroup from '../pages/MasterAdministrator/AssingGroup';

//import components administrator campus
import signinCampus from '../pages/CampusAdministrator/SigninCampus';
import HomeCampus from '../pages/CampusAdministrator/Home';
import RegisterGroupOccurrences from '../pages/CampusAdministrator/Register/RegisterGroupOccurrences';
import ListGroupOccurrences from '../pages/CampusAdministrator/List/ListGroupOccurrences';
import EditGroupOccurrences from '../pages/CampusAdministrator/Edit/EditGroupOccurrences';
import RegisterPlaces from '../pages/CampusAdministrator/Register/RegisterPlaces';
import ListPlaces from '../pages/CampusAdministrator/List/ListPlaces';
import EditPlaces from '../pages/CampusAdministrator/Edit/EditPlaces';
import RegisterObject from '../pages/CampusAdministrator/Register/RegisterObjects';
import ListObjects from '../pages/CampusAdministrator/List/ListObjects';
import EditObjects from '../pages/CampusAdministrator/Edit/EditObjects';
import ListDemands from '../pages/CampusAdministrator/List/ListDemands';
import DetailsDemands from '../pages/CampusAdministrator/DemandsDetails';
import UserMaintenance from '../pages/CampusAdministrator/List/ListUsersMaintenance';
import ListInitiatedDemands from '../pages/CampusAdministrator/List/ListInitiatedDemands';
import ListCompletedDemands from '../pages/CampusAdministrator/List/ListCompletedDemands';
import ListForms from '../pages/CampusAdministrator/List/ListForms';
import RegisterForm from '../pages/CampusAdministrator/Register/RegisterForm';
import RegisterFormQuestion from '../pages/CampusAdministrator/Register/RegisterQuestions';
import RegisterQuestionItem from '../pages/CampusAdministrator/Register/RegisterQuestionItem';
import PreviewForm  from '../pages/CampusAdministrator/PreviewForm';

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

const PrivateRouteCampus = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/campus/signin', state: { from: props.location } }} />
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
      <PrivateRouteMaster exact path="/master/listCampus" component={ListCampus} />
      <PrivateRouteMaster exact path="/master/editCampus/:id" component={editCampus} />
      <PrivateRouteMaster exact path="/master/registerAdmin" component={RegisterAdmin} />
      <PrivateRouteMaster exact path="/master/listAdmins" component={ListAdmins} />
      <PrivateRouteMaster exact path="/master/editAdmins/:id" component={EditAdmins} />
      <PrivateRouteMaster exact path="/master/assignUserGroup" component={ListAssingUserGroup} />
      <PrivateRouteMaster exact path="/master/assignGroup/:id" component={AssingGroup} />

      <Route exact path="/campus/signin" component={signinCampus} />
      <PrivateRouteCampus exact path="/campus/home" component={HomeCampus} />
      <PrivateRouteCampus exact path="/campus/registerGroupOccurrences" component={RegisterGroupOccurrences} />
      <PrivateRouteCampus exact path="/campus/listGroupOccurrences" component={ListGroupOccurrences} />
      <PrivateRouteCampus exact path="/campus/EditGroupOccurrences/:id" component={EditGroupOccurrences} />
      <PrivateRouteCampus exact path="/campus/registerPlaces" component={RegisterPlaces} />
      <PrivateRouteCampus exact path="/campus/listPlaces" component={ListPlaces} />
      <PrivateRouteCampus exact path="/campus/editPlaces/:id" component={EditPlaces} />
      <PrivateRouteCampus exact path="/campus/registerObject" component={RegisterObject} />
      <PrivateRouteCampus exact path="/campus/listObject" component={ListObjects} />
      <PrivateRouteCampus exact path="/campus/editObject/:id" component={EditObjects} />
      <PrivateRouteCampus exact path="/campus/listDemands" component={ListDemands} />
      <PrivateRouteCampus exact path="/campus/detailsDemands/:id" component={DetailsDemands} />
      <PrivateRouteCampus exact path="/campus/usersMaintenance/:id" component={UserMaintenance} />
      <PrivateRouteCampus exact path="/campus/listInitiatedDemands" component={ListInitiatedDemands} />
      <PrivateRouteCampus exact path="/campus/listCompletedDemands" component={ListCompletedDemands} />
      <PrivateRouteCampus exact path="/campus/registerForm" component={RegisterForm} />
      <PrivateRouteCampus exact path="/campus/registerFormQuestion" component={RegisterFormQuestion} />
      <PrivateRouteCampus exact path="/campus/registerQuestionItem" component={RegisterQuestionItem} />
      <PrivateRouteCampus exact path="/campus/listForms" component={ListForms} />
      <PrivateRouteCampus exact path="/campus/previewForm/:id" component={PreviewForm} />

      <Route path="*" component={() => <h1>Error</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
