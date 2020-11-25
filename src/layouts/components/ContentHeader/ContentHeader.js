import React from "react";
import "./contentHeader.css";
import { MenuFoldOutlined } from "@ant-design/icons";

import avatar from "../../../assets/images/avatar.png";

function ContentHeader(props) {
  return (
    <div className="lch-container">
      <div className="lch-content">
        <div className="lch-leftIconContainer">
          <MenuFoldOutlined style={{ fontSize: "20px", padding: "0 20px" }} />
        </div>
        <div className="lch-headerEnd">
          <div></div>
          <div></div>
          <div>
            <img className="lch-avatarImg" src={avatar} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
