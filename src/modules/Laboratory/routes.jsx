import React from "react";
import { Route, Switch } from "react-router-dom";
import EditTest from "./test/components/editTest/EditTest";
import Edit from "./test/components/editTest/replication/component/edit/Edit";
import ViewTest from "./test/components/viewTest/ViewTest";
import IndexTest from "./test/IndexTest";


const LaboratoryModule = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/test`} component={IndexTest} />
    <Route exact path={`${match.url}/test/edit/:id`} component={EditTest} />
    <Route exact path={`${match.url}/test/replication/edit/:id`} component={Edit} />
    <Route exact path={`${match.url}/test/view/:id`} component={ViewTest} />
  </Switch>
);

export default LaboratoryModule;
