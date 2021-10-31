import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/components/Dashboard"

const ModuleRoutes = ({ match }) => (
    <Switch>
        <Route path={`${match.url}`} component={Dashboard} />
    </Switch>
);

export default ModuleRoutes;
