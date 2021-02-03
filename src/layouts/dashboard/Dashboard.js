import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "react-sidebar";

import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import SidebarHeader from "../components/SidebarHeader/SidebarHeader";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import { sideBarMenuItemsList } from "../";
import dashboardRoutes from "../../routes/dashboard";
import { userUtil } from "../../utils";

const sidebarStyle = {
  //   background: "linear-gradient(to right, rgba(5,29,57,1), rgba(30,52,77,1))",
  background: "white",
  width: "255px",
  top: "70px",
  paddingLeft: "0px",
  color: "white",
  position: "absolute",
  overflow: "hidden",
  zIndex: 1,
  // boxShadow: "0 0px 4px 0 rgba(0, 0, 0, 0.2)",
};
const contentStyle = {
  background: "rgb(240, 242, 245)",
  top: "70px",
  padding: "20px",
};

// import dashboardRoutes from '../../Views/Dashboard/Dashboard'
const mql = window.matchMedia(`(min-width: 900px)`);
class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      mql,
      open: false,
      organisation: {},
    };
  }
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    const org = userUtil.getOrganisation();
    console.log(org);
    this.setState({ org });
  }
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  onSetSidebarOpen(open) {
    // if(typeof open === 'Boolean') return;
    this.setState({ sidebarOpen: open });
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      upgrade_registeration: {
        ...this.state.upgrade_registeration,
        ...{ [name]: value },
      },
    });
  };

  getOrg() {
    return userUtil.getOrganisation();
  }

  organisation = userUtil.getOrganisation();

  render() {
    return (
      <div>
        <div className="dsh-sidebarTop">
          <SidebarHeader organisation={this.organisation} title="Dashboard" />
          <ContentHeader title="Dashboard" />
        </div>
        <Sidebar
          shadow={false}
          sidebar={
            <SidebarMenu
              items={sideBarMenuItemsList}
              open={this.state.open}
              handleOpen={this.handleOpen}
            />
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: sidebarStyle, content: contentStyle }}
        >
          <>
            <Switch>
              {dashboardRoutes.map((prop, key) => {
                return (
                  <Route
                    key={key}
                    exact={prop.exact}
                    path={prop.path}
                    component={prop.component}
                  />
                );
              })}
            </Switch>
          </>
        </Sidebar>
      </div>
    );
  }
}

export default DashboardLayout;
