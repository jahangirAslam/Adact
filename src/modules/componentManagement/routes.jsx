import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexSubstance from "./substances/IndexSubstance";
import EditSubstance from "./substances/components/EditSubstance";
import Flavours from "./flavours/IndexFlavours";
import ViewUser from "../userManagement/users/components/ViewUser";
import ViewFlavour from "./flavours/components/ViewFlavour";
import EditFlavour from "./flavours/components/edit/EditFlavour";
import ViewSubstances from "./substances/components/viewSubstances/ViewSubstances";

const SubstanceModule = ({ match }) => (
  <Switch>
    {/* Chemical substances Rautes */}
    <Route exact path={`${match.url}/substances`} component={IndexSubstance} />
    <Route exact path={`${match.url}/substances/edit/:id`} component={EditSubstance} />
    <Route exact path={`${match.url}/substances/view/:id`} component={ViewSubstances} />

    {/* Chemical substances Rautes */}
    {/* Flavours Rautes */}
    <Route exact path={`${match.url}/flavours`} component={Flavours} />
    <Route exact path={`${match.url}/users/view/:id`} component={ViewFlavour} />
    <Route exact path={`${match.url}/users/edit/:id`} component={EditFlavour} />

    {/* Flavours Rautes */}
  </Switch>
);

export default SubstanceModule;
