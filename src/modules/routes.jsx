import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/components/Dashboard";
import UserModule from "./userManagement/routes";

const ModuleRoutes = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}`} component={Dashboard} />
        <Route path={`${match.url}user-management`} component={UserModule} />
    </Switch>
);

export default ModuleRoutes;
