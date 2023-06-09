import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexLocation from "./locations/IndexLocation";
import EditLocation from "./locations/components/EditLocation";
import ViewLocation from "./locations/components/ViewLocation";

import IndexContact from "./contacts/IndexContact";
import EditContact from "./contacts/components/EditContact";
import ViewContact from "./contacts/components/ViewContact";

import IndexAttachment from "./attachments/IndexAttachment";

import IndexBrand from "./brands/IndexBrand";
import Business from "./Business/Business";

import CreateBrand from "./brands/components/CreateBrand";
import EditBrand from "./brands/components/EditBrand";
import ViewBrand from "./brands/components/ViewBrand";

const CommonModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/locations` } component={ IndexLocation } />
    <Route exact path={ `${match.url}/locations/edit/:id` } component={ EditLocation } />
    <Route exact path={ `${match.url}/locations/view/:id` } component={ ViewLocation } />
    <Route exact path={ `${match.url}/business` } component={ Business }></Route>
    <Route exact path={ `${match.url}/contacts` } component={ IndexContact } />
    <Route exact path={ `${match.url}/contacts/edit/:id` } component={ EditContact } />
    <Route exact path={ `${match.url}/contacts/view/:id` } component={ ViewContact } />


    
    <Route exact path={ `${match.url}/attachments` } component={ IndexAttachment } />
    
    <Route exact path={ `${match.url}/brands` } component={ IndexBrand } />
    <Route exact path={ `${match.url}/brands/create` } component={ CreateBrand } />
    <Route exact path={ `${match.url}/brands/edit/:id` } component={ EditBrand } />
    <Route exact path={ `${match.url}/brands/view/:id` } component={ ViewBrand } />
  </Switch>
);

export default CommonModule;
