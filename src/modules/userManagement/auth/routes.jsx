import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";

const AuthRoutes = () => (
    <Switch>
        <Route path="/" component={Login} />
    </Switch>
);

export default AuthRoutes;
