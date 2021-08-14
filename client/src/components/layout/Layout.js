import React from "react";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">{children}</div>
    </div>
  );
};

export default Layout;
