import { memo } from "react";
import { useSelector } from "react-redux";
import MainApp from "./Main";
import AuthApp from "@mods/userManagement/auth/routes";
import { AppProvider } from "../utils/context";
import "../assets/styles/customStyle.css"
const App = () => {
  const authUser = useSelector((state) => state.auth.authUser);

  return (
    <AppProvider>
      {authUser && authUser.id ? <MainApp /> : <AuthApp />}
    </AppProvider>
  );
};

export default memo(App);
