import React from "react";
import { Route, Switch } from "react-router-dom";

import ViewUser from "../../../userManagement/users/components/ViewUser";

const UserModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/users/view/:id` } component={ ViewUser } />
  </Switch>
);

export default UserModule;
