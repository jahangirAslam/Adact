import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexSubstance from "./substances/IndexSubstance";
import EditSubstance from "./substances/components/EditSubstance";
import Flavours from "./flavours/IndexFlavours";

const SubstanceModule = ({ match }) => (
  <Switch>
     {/* Chemical substances Rautes */}
    <Route exact path={ `${match.url}/substances` } component={ IndexSubstance } />
    <Route exact path={ `${match.url}/substances/edit/:id` } component={ EditSubstance } />
     {/* Chemical substances Rautes */}
     {/* Flavours Rautes */}
    <Route exact path={ `${match.url}/flavours` } component={ Flavours } />
     {/* Flavours Rautes */}
  </Switch>
);

export default SubstanceModule;
