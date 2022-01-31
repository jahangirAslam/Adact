import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexCustomer from "./customers/IndexCustomer";
import EditCustomer from "./customers/components/EditCustomer";
import IndexManufacturer from "./manufacturers/IndexManufacturer";
import EditManufacturer from "./manufacturers/components/EditManufacturer";
import IndexLaboratory from "./laboratories/IndexLaboratory";
import EditLaboratory from "./laboratories/components/EditLaboratory";
import IndexAllThirdParty from "./allthirdparties/IndexAllThirdParty";
import EditAllThirdParty from "./allthirdparties/components/EditAllThirdParty";

const ThirdPartyModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/customers` } component={ IndexCustomer } />
    <Route exact path={ `${match.url}/customers/edit/:id` } component={ EditCustomer } />
    <Route exact path={ `${match.url}/manufacturers` } component={ IndexManufacturer } />
    <Route exact path={ `${match.url}/manufacturers/edit/:id` } component={ EditManufacturer } />
    <Route exact path={ `${match.url}/laboratories` } component={ IndexLaboratory } />
    <Route exact path={ `${match.url}/laboratories/edit/:id` } component={ EditLaboratory } />
    <Route exact path={ `${match.url}/all-third-parties` } component={ IndexAllThirdParty } />
    <Route exact path={ `${match.url}/all-third-parties/edit/:id` } component={ EditAllThirdParty } />
  </Switch>
);

export default ThirdPartyModule;
