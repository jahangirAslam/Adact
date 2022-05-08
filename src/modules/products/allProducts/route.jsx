import React from "react";
import { Route, Switch } from "react-router-dom";
import EditProduct from "./components/editProduct/EditProduct";
import IndexProducts from "./IndexProducts";

const ProductRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/all_products`} component={IndexProducts} />
    <Route exact path={`${match.url}/product/edit/:id`} component={EditProduct} />

  </Switch>
);

export default ProductRoutes;
