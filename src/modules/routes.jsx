import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/components/Dashboard";
import UserModule from "./userManagement/routes";
import CommonModule from "./commons/routes";
import DocumentModule from "./documentManagement/routes";

const ModuleRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Dashboard} />
    <Route path={`${match.url}user-management`} component={UserModule} />
    <Route path={`${match.url}document-management`} component={DocumentModule} />
    <Route path={ `${match.url}common` } component={ CommonModule } />
  </Switch>
);

export default ModuleRoutes;
