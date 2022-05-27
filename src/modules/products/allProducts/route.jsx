import React from "react";
import { Route, Switch } from "react-router-dom";
import IndexDevice from "../e-Device/IndexDevice";
import IndexLiquid from "../e-liquid/IndexLiquid";
import EditProduct from "./components/editProduct/EditProduct";
import EditTest from "./components/editProduct/labTest/components/editTest/EditTest";
import ViewAllProduct from "./components/viewProdtucs/ViewAllProduct";
import IndexProducts from "./IndexProducts";

const ProductRoutes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/all_products`} component={IndexProducts} />
    <Route exact path={`${match.url}/product/edit/:id`} component={EditProduct} />
    <Route exact path={`${match.url}/product/view/:id`} component={ViewAllProduct} />
    <Route exact path={`${match.url}/product-test/view/:id`} component={EditTest} />
    <Route exact path={`${match.url}/e-liquid`} component={IndexLiquid} />
    <Route exact path={`${match.url}/e-device`} component={IndexDevice} />
  </Switch>
);

export default ProductRoutes;
