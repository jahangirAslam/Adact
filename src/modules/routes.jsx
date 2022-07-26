import React from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "../containers/components/header/profile/profile";
import ProductBrands from "./Brands/routes";
import SettingsModule from "./Business/routes";
import CommonModule from "./commons/routes";
import SubstanceModule from "./componentManagement/routes";
import Dashboard from "./dashboard/components/Dashboard";
import DocumentModule from "./documentManagement/routes";
import Templates from "./globalTemplates/routes";
import LaboratoryModule from "./Laboratory/routes";
import ProductRoutes from "./products/allProducts/route";
import ThirdPartyModule from "./thirdPartyManagement/routes";
import UserModule from "./userManagement/routes";

const ModuleRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={Dashboard} />
    <Route path={`${match.url}user-management`} component={UserModule} />
    <Route path={`${match.url}document-management`} component={DocumentModule} />
    <Route path={ `${match.url}common` } component={ CommonModule } />
    <Route path={ `${match.url}third-party` } component={ ThirdPartyModule } />
    <Route path={ `${match.url}products` } component={ ProductRoutes } />
    <Route path={ `${match.url}component-management` } component={ SubstanceModule } />
     <Route path={ `${match.url}global-template` } component={ Templates } />
    <Route path={ `${match.url}laboratory` } component={ LaboratoryModule } />
    <Route path={ `${match.url}settings` } component={ SettingsModule } />
    <Route path={ `${match.url}product` } component={ProductBrands} />
    <Route path={ `${match.url}Profile` } component={ Profile } />

  </Switch>
);

export default ModuleRoutes;
