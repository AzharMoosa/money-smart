import React from "react";
import LogoImage from "../img/logo_img.png";

const Logo = ({ width, height, textSize }) => {
  return (
    <div className="logo">
      <img src={LogoImage} width={width} height={height} alt={"Logo"} />
      <h2 style={{ fontSize: textSize }}>Money Smart</h2>
    </div>
  );
};

Logo.defaultProps = {
  width: 103,
  height: 66,
  textSize: 48,
};

export default Logo;
