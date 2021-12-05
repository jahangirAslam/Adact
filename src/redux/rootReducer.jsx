import authReducer from "@mods/userManagement/auth/authSlice";
import commonSlice from "./commonSlice";

const reducer = {
  auth: authReducer,
  common: commonSlice,
}

export default reducer;