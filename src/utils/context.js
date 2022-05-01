import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.object,
};

export { AppContext, AppProvider };
