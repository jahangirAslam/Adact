import React from "react";
import { Route, Switch } from "react-router-dom";
import IndexProducts from "./IndexProducts";

const ProductRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/all_products`} component={IndexProducts} />
  </Switch>
);

export default ProductRoutes;
