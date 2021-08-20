import React from "react";
import Navbar from "../sidebar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Navbar />
      <div className="main-container">{children}</div>
    </div>
  );
};

export default Layout;
