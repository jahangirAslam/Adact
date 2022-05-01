import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexSubstance from "./substances/IndexSubstance";
import EditSubstance from "./substances/components/EditSubstance";

const SubstanceModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/substances` } component={ IndexSubstance } />
    <Route exact path={ `${match.url}/substances/edit/:id` } component={ EditSubstance } />
  </Switch>
);

export default SubstanceModule;
