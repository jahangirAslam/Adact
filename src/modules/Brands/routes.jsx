import React from "react";
import { Route, Switch } from "react-router-dom";
// import EditTest from "./test/components/editTest/EditTest";
// import ViewTest from "./test/components/viewTest/ViewTest";
import IndexBrands from "./test/IndexBrands";


const ProductBrands = ({ match }) => (

  <Switch>
    <Route exact path={`${match.url}/brands`} component={IndexBrands} />
    {/* <Route exact path={`${match.url}/business/edit/:id`} component={EditTest} />
    <Route exact path={`${match.url}/business/view/:id`} component={ViewTest} /> */}
  </Switch>
);

export default ProductBrands;
