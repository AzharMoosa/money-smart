import React from "react";
import LogoImage from "../img/logo_img.png";
const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoImage} width={103} height={66} alt={"Logo"} />
      <h2>Money Smart</h2>
    </div>
  );
};

export default Logo;
