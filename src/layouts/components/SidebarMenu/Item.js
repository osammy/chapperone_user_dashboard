import React from "react";
import { NavLink } from "react-router-dom";

function Item(props) {
  const Icon = props.icon;
  const { index, handleSelected, keyState, listStyle } = props;
  const listColor =
    index === keyState ? "rgb(37, 147, 252)" : "rgb(103,103,103)";

  const iconStyle = { fontSize: "20px", color: listColor };
  return (
    <li
      onClick={handleSelected}
      style={listStyle}
      className="cmpt-sidebar-menu-item"
    >
      <NavLink
        style={{
          textDecoration: "none",
        }}
        className="color-white cmpt-links"
        to={props.path}
      >
        <div>
          <Icon style={iconStyle} />
          &nbsp;&nbsp;
          <span style={{ color: listColor }} className="small menu-item-span">
            {props.name.toUpperCase()}
          </span>
        </div>
      </NavLink>
      {/*<div>{(prop.sub.length !== 0) && <IoIosArrowDown style={{color:"#6a737d"}} />}</div>*/}
    </li>
  );
}

export default Item;
