import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [companyDetails, setCompanyDetails] = useState(() => {
    const storedDetails = localStorage.getItem("companyDetails");
    return storedDetails
      ? JSON.parse(storedDetails)
      : {
          cName: "",
          website: "",
          start: "",
          startMonth: "",
          industry: "",
          idea: "",
        };
  });

  return (
    <AppContext.Provider value={{ companyDetails, setCompanyDetails }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
