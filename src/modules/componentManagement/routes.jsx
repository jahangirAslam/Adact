import React from "react";
import { Route, Switch } from "react-router-dom";
import EditFlavour from "./flavours/components/edit/EditFlavour";
import ViewFlavour from "./flavours/components/ViewFlavour";
import Flavours from "./flavours/IndexFlavours";
import EditSubstance from "./substances/components/EditSubstance";
import ViewSubstances from "./substances/components/viewSubstances/ViewSubstances";
import IndexSubstance from "./substances/IndexSubstance";


const SubstanceModule = ({ match }) => (
  <Switch>
    {/* Chemical substances Rautes */}
    <Route exact path={`${match.url}/substances`} component={IndexSubstance} />
    <Route exact path={`${match.url}/substances/edit/:id`} component={EditSubstance} />
    <Route exact path={`${match.url}/substances/view/:id`} component={ViewSubstances} />

    {/* Chemical substances Rautes */}
    <Route exact path={`${match.url}/chemical-compound`} component={IndexSubstance} />

    {/* Flavours Rautes */}
    <Route exact path={`${match.url}/flavours`} component={Flavours} />
    <Route exact path={`${match.url}/users/view/:id`} component={ViewFlavour} />
    <Route exact path={`${match.url}/users/edit/:id`} component={EditFlavour} />

    {/* Flavours Rautes */}
  </Switch>
);

export default SubstanceModule;
