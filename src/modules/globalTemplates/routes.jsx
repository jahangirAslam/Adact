import React from "react";
import { Route, Switch } from "react-router-dom";
import EditChemicalCompound from "../componentManagement/chemicalCompounds/components/EditChemicalCompound";
import IndexManageGlobal from "./manageGolabalTemplates/indexManageGlobal";
import IndexManageVariable from "./manageVariable/indexManageGlobal";
// import EditSubstance from "./substances/components/EditSubstance";
// import ViewSubstances from "./substances/components/viewSubstances/ViewSubstances";
// import IndexSubstance from "./substances/IndexSubstance";


const Templates = ({ match }) => (
  <Switch>
    {/* Global Templates Rautes */}
    <Route exact path={`${match.url}/manage-template-variable`} component={IndexManageVariable} />
    {/* <Route exact path={`${match.url}/manage-global-variable/edit/:id`} component={EditSubstance} />
    <Route exact path={`${match.url}/manage-global-variable/view/:id`} component={ViewSubstances} /> */}

    {/* Global Templates */}
    <Route exact path={`${match.url}/manage-global-templates`} component={IndexManageGlobal} />
     {/* <Route exact path={`${match.url}/manage-global-templates/edit/:id`} component={EditChemicalCompound} />  */}

    
  </Switch>
);

export default Templates;
