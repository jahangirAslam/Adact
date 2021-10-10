import { Route, Switch, useRouteMatch } from "react-router-dom";

import ModuleRoutes from "@mods/routes";


const Main = () => {
  const { path } = useRouteMatch();

  // Wrap Layout around router.
  return (
    <Switch>
      <Route path={path} component={ModuleRoutes} />
    </Switch>
  );
};

export default Main;

