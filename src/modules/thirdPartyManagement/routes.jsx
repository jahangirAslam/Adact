import React from "react";
import { Route, Switch } from "react-router-dom";
import IndexProducts from "../products/allProducts/IndexProducts";
import IndexCustomer from "./customers/IndexCustomer";
import EditCustomer from "./customers/components/EditCustomer";
import IndexManufacturer from "./manufacturers/IndexManufacturer";
import EditManufacturer from "./manufacturers/components/EditManufacturer";
import IndexLaboratory from "./laboratories/IndexLaboratory";
import EditLaboratory from "./laboratories/components/EditLaboratory";
import IndexAllThirdParty from "./allthirdparties/IndexAllThirdParty";
import EditAllThirdParty from "./allthirdparties/components/EditAllThirdParty";
import IndexCompany from "./companies/IndexCompany";
import CreateCompany from "./companies/components/CreateCompany";
import EditCompany from "./companies/components/EditCompany";
import IndexAgent from "./agents/IndexAgent";
import CreateAgent from "./agents/components/CreateAgent";
import EditAgent from "./agents/components/EditAgent";
import IndexFacility from "./facilities/IndexFacility";
import CreateFacility from "./facilities/components/CreateFacility";
import EditFacility from "./facilities/components/EditFacility";

const ThirdPartyModule = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/customers`} component={IndexCustomer} />
    <Route exact path={`${match.url}/customers/edit/:id`} component={EditCustomer} />
    <Route exact path={`${match.url}/manufacturers`} component={IndexManufacturer} />
    <Route exact path={`${match.url}/manufacturers/edit/:id`} component={EditManufacturer} />
    <Route exact path={`${match.url}/laboratories`} component={IndexLaboratory} />
    <Route exact path={`${match.url}/laboratories/edit/:id`} component={EditLaboratory} />
    <Route exact path={`${match.url}/all-third-parties`} component={IndexAllThirdParty} />
    <Route exact path={`${match.url}/all-third-parties/edit/:id`} component={EditAllThirdParty} />
    <Route exact path={`${match.url}/companies`} component={IndexCompany} />
    <Route exact path={`${match.url}/companies/create`} component={CreateCompany} />
    <Route exact path={`${match.url}/companies/edit/:id`} component={EditCompany} />
    <Route exact path={`${match.url}/agents`} component={IndexAgent} />
    <Route exact path={`${match.url}/agents/create`} component={CreateAgent} />
    <Route exact path={`${match.url}/agents/edit/:id`} component={EditAgent} />
    <Route exact path={`${match.url}/facilities`} component={IndexFacility} />
    <Route exact path={`${match.url}/facilities/create`} component={CreateFacility} />
    <Route exact path={`${match.url}/facilities/edit/:id`} component={EditFacility} />
  </Switch>
);

export default ThirdPartyModule;
