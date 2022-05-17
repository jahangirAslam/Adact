import React from "react";
import { Route, Switch } from "react-router-dom";
import IndexTest from "./test/IndexTest";


const LaboratoryModule = ({ match }) => (
  <Switch>
    {/* Chemical substances Rautes */}
    <Route exact path={`${match.url}/test`} component={IndexTest} />
  </Switch>
);

export default LaboratoryModule;
