import React from "react";
import { Route, Switch } from "react-router-dom";
import EditTest from "./test/components/editTest/EditTest";
import ViewTest from "./test/components/viewTest/ViewTest";
import IndexBusiness from "./test/IndexBusiness";


const SettingsModule = ({ match }) => (

  <Switch>
    <Route exact path={`${match.url}/business`} component={IndexBusiness} />
    <Route exact path={`${match.url}/business/edit/:id`} component={EditTest} />
    <Route exact path={`${match.url}/business/view/:id`} component={ViewTest} />
  </Switch>
);

export default SettingsModule;
