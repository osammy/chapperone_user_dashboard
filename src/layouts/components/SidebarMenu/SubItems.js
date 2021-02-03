import React from "react";
import { NavLink } from "react-router-dom";

function SubItems(props) {
  let SubIcon = props.icon;
  const { subLinkClass } = props;

  return (
    <li style={{ fontSize: "0.9em" }} className={subLinkClass}>
      <NavLink
        activeStyle={{
          color: "#8fc348",
          background: "black",
        }}
        style={{ textDecoration: "none" }}
        className="color-white cmpt-links"
        to={props.path}
      >
        <SubIcon style={{ color: "#6a737d", fontSize: "0.95em" }} />
        &nbsp;&nbsp;
        <span className="small menu-item-span">{props.name.toUpperCase()}</span>
      </NavLink>
    </li>
  );
}

export default SubItems;
