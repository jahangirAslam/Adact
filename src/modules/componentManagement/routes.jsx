import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexSubstance from "./substances/IndexSubstance";
import EditSubstance from "./substances/components/EditSubstance";
import IndexChemicalCompound from "./chemicalCompounds/IndexChemicalCompound";
import EditChemicalCompound from "./chemicalCompounds/components/EditChemicalCompound";

const ComponentsModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/substances` } component={ IndexSubstance } />
    <Route exact path={ `${match.url}/substances/edit/:id` } component={ EditSubstance } />
    <Route exact path={ `${match.url}/chemical-compounds` } component={ IndexChemicalCompound } />
    <Route exact path={ `${match.url}/chemical-compounds/edit/:id` } component={ EditChemicalCompound } />
  </Switch>
);

export default ComponentsModule;
