import React from "react";
import { Route, Switch } from "react-router-dom";
import EditProduct from "./components/editProduct/EditProduct";
import IndexLiquid from "./IndexLiquid";
import IndexProducts from "./IndexLiquid";

const ProductRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/all_products`} component={IndexProducts} />
    <Route exact path={`${match.url}/product/edit/:id`} component={EditProduct} />
    <Route exact path={`${match.url}/e-liquid`} component={IndexLiquid} />
  </Switch>
);

export default ProductRoutes;
