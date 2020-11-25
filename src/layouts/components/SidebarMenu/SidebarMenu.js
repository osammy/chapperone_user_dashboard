import React, { Component } from "react";
import { IoIosArrowDown } from "react-icons/io";
// import OrderboxIcon from "../Images/orderbox_white.png";
import { NavLink } from "react-router-dom";
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
  render() {
    const { items } = this.props;
    const { open, key } = this.state;

    return (
      <div>
        <ul className="cmpt-ul">
          {items.map((prop, key) => {
            let Icon = prop.icon;
            let iconClass = open[key]
              ? "cmpt-selected-list-open"
              : "cmpt-selected-list-close";
            let subLinkClass = open[key]
              ? "cmpt-sub-sidebar-menu-item py-1"
              : "cmpt-display-none";
            if (prop.subItems.length !== 0)
              return (
                <div key={key}>
                  <li
                    onClick={() => {
                      this.handleOpen(key);
                    }}
                    key={key}
                    style={{ cursor: "auto" }}
                    className="pl-4 cmpt-sidebar-menu-item  space-item"
                  >
                    <div>
                      <Icon style={{ color: "#6a737d" }} />
                      &nbsp;
                      <span className="small cmpt-off-white">
                        <b>{prop.name.toUpperCase()}</b>
                      </span>
                    </div>
                    <div>
                      {prop.subItems.length !== 0 && (
                        <IoIosArrowDown
                          style={{ color: "#6a737d" }}
                          className={iconClass}
                        />
                      )}
                    </div>
                  </li>
                  {prop.subItems.map((dprop, dkey) => {
                    let SubIcon = dprop.icon;
                    return (
                      <li
                        style={{ fontSize: "0.9em" }}
                        key={dkey}
                        className={subLinkClass}
                      >
                        <NavLink
                          activeStyle={{
                            color: "#8fc348",
                            background: "black",
                          }}
                          style={{ textDecoration: "none" }}
                          className="color-white cmpt-links"
                          to={dprop.path}
                        >
                          <SubIcon
                            style={{ color: "#6a737d", fontSize: "0.95em" }}
                          />
                          &nbsp;&nbsp;
                          <span className="small menu-item-span">
                            {dprop.name.toUpperCase()}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                </div>
              );

            return (
              <li
                key={key}
                onClick={() => this.handleSelected(key)}
                style={this.listStyle(key)}
                className="pl-4 cmpt-sidebar-menu-item"
              >
                <NavLink
                  // activeStyle={{ color: "#8fc348", background: "black" }}
                  style={{
                    textDecoration: "none",
                  }}
                  activeClassName="selected"
                  className="color-white cmpt-links"
                  to={prop.path}
                >
                  <div>
                    <Icon
                      style={{
                        color:
                          key === this.state.key
                            ? "rgb(37, 147, 252)"
                            : "rgb(103,103,103)",
                      }}
                    />
                    &nbsp;
                    <span
                      style={{
                        color:
                          key === this.state.key
                            ? "rgb(37, 147, 252)"
                            : "rgb(103,103,103)",
                      }}
                      className="small menu-item-span"
                    >
                      {prop.name.toUpperCase()}
                    </span>
                  </div>
                </NavLink>
                {/*<div>{(prop.sub.length !== 0) && <IoIosArrowDown style={{color:"#6a737d"}} />}</div>*/}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SidebarMenu;
