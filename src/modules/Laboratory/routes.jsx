import React from "react";
import { Route, Switch } from "react-router-dom";
import IndexSubstance from "../componentManagement/substances/IndexSubstance";


const LaboratoryModule = ({ match }) => (
  <Switch>
    {/* Chemical substances Rautes */}
    <Route exact path={`${match.url}/test`} component={IndexSubstance} />
  </Switch>
);

export default LaboratoryModule;
