import React from "react";
import { Route, Switch } from "react-router-dom";
import ViewTest from "../Laboratory/test/components/viewTest/ViewTest";
import EditTest from "./test/components/editTest/EditTest";
import IndexBrands from "./test/IndexBrands";


const ProductBrands = ({ match }) => (

  <Switch>
    <Route exact path={`${match.url}/brands`} component={IndexBrands} />
     <Route exact path={`${match.url}/brands/edit/:id`} component={EditTest} /> 
    <Route exact path={`${match.url}/brands/view/:id`} component={ViewTest} /> 
  </Switch>
);

export default ProductBrands;
