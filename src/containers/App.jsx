import { memo } from "react";
import { useSelector } from 'react-redux'
import MainApp from "./Main";
import AuthApp from "@mods/userManagement/auth/routes";

const App = () => {
  const authUser = useSelector((state) => state.auth);

  return (
    authUser && authUser.id ? MainApp() : AuthApp()
  );

}

export default memo(App);
