import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexSubstance from "./substances/IndexSubstance";
import EditSubstance from "./substances/components/EditSubstance";
import Flavours from "./flavours/IndexFlavours";
import ViewUser from "../userManagement/users/components/ViewUser";
import ViewFlavour from "./flavours/components/ViewFlavour";

const SubstanceModule = ({ match }) => (
  <Switch>
     {/* Chemical substances Rautes */}
    <Route exact path={ `${match.url}/substances` } component={ IndexSubstance } />
    <Route exact path={ `${match.url}/substances/edit/:id` } component={ EditSubstance } />
     {/* Chemical substances Rautes */}
     {/* Flavours Rautes */}
    <Route exact path={ `${match.url}/flavours` } component={ Flavours } />
    <Route exact path={ `${match.url}/users/view/:id` } component={ ViewFlavour } />
     {/* Flavours Rautes */}
  </Switch>
);

export default SubstanceModule;
