import React from "react";
import "./index.css";
import { Menu, Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { sideBarMenuItemsList } from "../";
import dashboardRoutes from "../../routes/dashboard";
import Login from "../../views/Login/Login";

const { SubMenu } = Menu;
const { Sider } = Layout;
let dom = {};
try {
  dom = require("react-router-dom");
} catch (e) {}
const { Link, withRouter } = dom;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: localStorage.getItem("collapsedMenu") === "true",
      item: null,
    };
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    const item =
      path !== "/" ? path.substr(1) : sideBarMenuItemsList[0].name || null;
    this.setState({ item: item });
    this.unlisten = this.props.history.listen((location, action) => {
      const path = location.pathname;
      const item =
        path !== "/" ? path.substr(1) : sideBarMenuItemsList[0].name || null;
      this.setState({ item: item });
    });
  }

  onCollapse = (collapsed) => {
    localStorage.setItem("collapsedMenu", collapsed);
    this.setState({ collapsed });
  };

  renderMenuItem = (item) => {
    const { key, icon, name, path } = item;

    const Icon = icon;
    return (
      <Menu.Item icon={<Icon />} key={path}>
        <Link to={`${path}`}>
          <span>{name}</span>
        </Link>
      </Menu.Item>
    );
  };

  renderMenuItems = () => {
    // const items = this.props.menuItems || [];
    const items = sideBarMenuItemsList;

    return items.map((item) => {
      if (!item.subItems || item.subItems.length === 0) {
        return this.renderMenuItem(item);
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                {/* {item.icon} */}
                <span>{item.name}</span>
              </span>
            }
          >
            {item.subItems.map((subItem) => this.renderMenuItem(subItem))}
          </SubMenu>
        );
      }
    });
  };

  render() {
    const logo = this.props.logo || null;
    const expandedLogo = this.props.expandedLogo || null;

    // return <div>Dashboard</div>;
    return (
      <div className="dasboard-container">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ background: "red", height: "100vh" }}
        >
          {this.props.collapsed
            ? logo && <img src={logo} alt="logo" className="side-menu-logo" />
            : expandedLogo && (
                <img src={expandedLogo} alt="logo" className="side-menu-logo" />
              )}
          <Menu
            style={{ background: "rgb(2, 34, 63)" }}
            theme="dark"
            selectedKeys={[this.state.item]}
            mode="inline"
          >
            {this.renderMenuItems()}
          </Menu>
        </Sider>
        <div>
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              return (
                <Route
                  key={key}
                  // exact={prop.exact}
                  path="/"
                  // component={Login}
                  render={() => <Login />}
                  exact={false}

                  // path={prop.path}
                  // component={prop.component}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

let whatToExport;
if (dom.Route) {
  whatToExport = withRouter(SideMenu);
} else {
  whatToExport = (props) => <div>No React Router</div>;
}

export default whatToExport;
