import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/components/Dashboard";
import UserModule from "./userManagement/routes";
import CommonModule from "./commons/routes";
import DocumentModule from "./documentManagement/routes";
import ThirdPartyModule from "./thirdPartyManagement/routes"

const ModuleRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Dashboard} />
    <Route path={`${match.url}user-management`} component={UserModule} />
    <Route path={`${match.url}document-management`} component={DocumentModule} />
    <Route path={ `${match.url}common` } component={ CommonModule } />
    <Route path={ `${match.url}third-party` } component={ ThirdPartyModule } />
  </Switch>
);

export default ModuleRoutes;
