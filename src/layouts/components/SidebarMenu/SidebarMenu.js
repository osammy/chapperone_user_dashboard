import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Item from "./Item";
import SubMenu from "./SubMenu";
import { sideBarMenuItemsList } from "../../";
import "./index.css";

class SidebarMenu extends Component {
  state = {
    open: Array(this.props.items.length).fill(false),
    key: null,
  };

  handleSelected = (key) => {
    this.setState({ key });
  };

  handleOpen = (index) => {
    const arr = [...this.state.open];
    const val = this.state.open[index];
    arr[index] = !val;
    this.setState({ open: arr });
  };

  listStyle = (key) => {
    if (key === this.state.key) {
      return {
        backgroundColor: "rgb(231, 247, 255)",
        borderRight: "2px solid rgb(37, 147, 252)",
      };
    }

    return { backgroundColor: "white", border: "none" };
  };

  componentDidMount() {
    console.log(this.props.history.location.pathname);
    console.log(sideBarMenuItemsList);
    const index = sideBarMenuItemsList.findIndex(
      (el) => el.path === this.props.history.location.pathname
    );
    this.setState({ key: index });
  }
  render() {
    const { items } = this.props;
    const { open } = this.state;

    return (
      <div className="cmpt-container">
        <ul className="cmpt-ul">
          {items.map((prop, key) => {
            if (prop.subItems.length !== 0)
              return (
                <SubMenu
                  {...prop}
                  key={key}
                  open={open}
                  index={key}
                  handleOpen={() => this.handleOpen(key)}
                />
              );

            return (
              <Item
                {...prop}
                key={key}
                keyState={this.state.key}
                listStyle={this.listStyle(key)}
                handleSelected={() => this.handleSelected(key)}
                index={key}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(SidebarMenu);
