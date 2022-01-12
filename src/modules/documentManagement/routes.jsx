import React from "react";
import { Route, Switch } from "react-router-dom";

import IndexDocument from "./documents/IndexDocument";

const DocumentModule = ({ match }) => (
  <Switch>
    <Route exact path={ `${match.url}/documents` } component={ IndexDocument } />
  </Switch>
);

export default DocumentModule;
