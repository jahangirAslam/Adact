import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexContact from "./contacts/IndexContact";
import EditContact from "./contacts/components/EditContact";
import ViewContact from "./contacts/components/ViewContact";

const ThirdPartyModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/contacts` } component={ IndexContact } />
    <Route exact path={ `${match.url}/contacts/edit/:id` } component={ EditContact } />
    <Route exact path={ `${match.url}/contacts/view/:id` } component={ ViewContact } />
  </Switch>
);

export default ThirdPartyModule;
