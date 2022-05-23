import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ForgetUserName from "./pages/ForgetUserName";

const AuthRoutes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/forget-password" component={ForgetPassword} />
    <Route path="/forget-username" component={ForgetUserName} />
    <Route path="/reset-password" component={ResetPassword} />
  </Switch>
);

export default AuthRoutes;
