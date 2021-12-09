import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexUser from "./users/IndexUser";
import EditUser from "./users/components/EditUser";
import EditRole from "./roles/components/EditRole";
import ViewRole from "./roles/components/ViewRole";
import ViewUser from "./users/components/ViewUser";
import IndexRole from "./roles/IndexRole";

const UserModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/users` } component={ IndexUser } />
    <Route exact path={ `${match.url}/users/edit/:id` } component={ EditUser } />
    <Route exact path={ `${match.url}/users/view/:id` } component={ ViewUser } />
    <Route exact path={ `${match.url}/roles` } component={ IndexRole } />
    <Route exact path={ `${match.url}/roles/edit/:id` } component={ EditRole } />
    <Route exact path={ `${match.url}/roles/view/:id` } component={ ViewRole } />
  </Switch>
);

export default UserModule;
