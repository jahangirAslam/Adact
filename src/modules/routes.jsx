import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/components/Dashboard";
import UserModule from "./userManagement/routes";
import CommonModule from "./commons/routes";
import DocumentModule from "./documentManagement/routes";
import ThirdPartyModule from "./thirdPartyManagement/routes"
import SubstanceModule from "./componentManagement/routes"
import ProductRoutes from "./products/allProducts/route";
import LaboratoryModule from "./Laboratory/routes";
import SettingsModule from "./Business/routes";
import ProductBrands from "./Brands/routes";
import Templates from "./globalTemplates/routes";

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

  </Switch>
);

export default ModuleRoutes;
