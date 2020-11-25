import React from "react";
import { Card } from "antd";
import logoText from "../../../assets/logos/Chapperone-font-v1.jpg";
import logo from "../../../assets/logos/icon_only_small.png";
import "./sidebarHeader.css";

function SidebarHeader() {
  return (
    <div className="sbh-container">
      <div className="sbh-content">
        <div className="sbh-topImgContainer">
          <img
            style={{ width: "34px", height: "40px" }}
            className="sbh-logo"
            src={logo}
            alt="logo"
          />
        </div>
        <img src={logoText} alt="logo" />
      </div>
    </div>
  );
}

export default SidebarHeader;
