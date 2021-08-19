import React from "react";
import LogoImage from "../img/logo_img.png";

const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoImage} alt={"Logo"} />
      <h2>Money Smart</h2>
    </div>
  );
};

export default Logo;
