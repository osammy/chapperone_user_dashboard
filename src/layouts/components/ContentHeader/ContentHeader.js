import React from "react";
import { useHistory } from "react-router";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Menu } from "antd";

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import avatar from "../../../assets/images/avatar.png";
import "./contentHeader.css";
import { userUtil, dateUtil } from "../../../utils";

const { SubMenu } = Menu;

function ContentHeader(props) {
  const history = useHistory();
  const renderAvatar = () => {
    const user = userUtil.getUserFromLocalStorage();

    return <img className="lch-avatarImg" src={user.avatar} alt="avatar" />;
  };

  const logout = () => {
    userUtil.removeUserToken();
    history.replace("/login");
  };

  const latestCotract = userUtil.getLatestContract();
  const user = userUtil.getUserFromLocalStorage();

  const renderTopMenu = () => {
    return (
      <Menu style={{ width: 95 }} mode="vertical">
        <SubMenu key="sub1" icon={renderAvatar()} title="">
          <Menu.Item onClick={logout} key="1">
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  };

  const renderContract = (e) => {
    return (
      <div className="lch-contract-header">
        <div>
          <CalendarOutlined />
          &nbsp; Expires: {dateUtil.formatDate(latestCotract.endDate)}
        </div>
        {/* <div>{latestCotract._id}</div> */}
      </div>
    );
  };
  return (
    <div className="lch-container">
      <div className="lch-content">
        <div className="lch-leftIconContainer">
          <div className="lch-left">
            <MenuFoldOutlined className="lch-leftIconContainer-icon" />
            <div className="lch-leftTextContainer">
              Welcome, {`${user.first_name} ${user.last_name}`}
            </div>
          </div>
        </div>

        <div className="lch-headerEnd">
          <div></div>
          {renderContract()}
          {renderTopMenu()}
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
