import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexUser from "./users/IndexUser";
import EditUser from "./users/components/EditUser";
import ViewUser from "./users/components/ViewUser";

const UserModule = ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/users`} component={IndexUser} />Î
        <Route exact path={`${match.url}/users/edit/:id`} component={EditUser} />Î
        <Route exact path={`${match.url}/users/view/:id`} component={ViewUser} />Î
    </Switch>
);

export default UserModule;
