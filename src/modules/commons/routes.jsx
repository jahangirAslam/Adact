import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexLocation from "./locations/IndexLocation";
import EditLocation from "./locations/components/EditLocation";
import ViewLocation from "./locations/components/ViewLocation";
import IndexContact from "./contacts/IndexContact";
import EditContact from "./contacts/components/EditContact";
import ViewContact from "./contacts/components/ViewContact";

const CommonModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/locations` } component={ IndexLocation } />
    <Route exact path={ `${match.url}/locations/edit/:id` } component={ EditLocation } />
    <Route exact path={ `${match.url}/locations/view/:id` } component={ ViewLocation } />
    <Route exact path={ `${match.url}/contacts` } component={ IndexContact } />
    <Route exact path={ `${match.url}/contacts/edit/:id` } component={ EditContact } />
    <Route exact path={ `${match.url}/contacts/view/:id` } component={ ViewContact } />
  </Switch>
);

export default CommonModule;
