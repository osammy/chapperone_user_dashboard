import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import SubItems from "./SubItems";

function SubMenu(props) {
  const Icon = props.icon;
  const { subItems, handleOpen, open, index } = props;

  let iconClass = open[index]
    ? "cmpt-selected-list-open"
    : "cmpt-selected-list-close";

  let subLinkClass = open[index]
    ? "cmpt-sub-sidebar-menu-item py-1"
    : "cmpt-display-none";
  return (
    <div>
      <li
        onClick={handleOpen}
        style={{ cursor: "auto" }}
        className="pl-4 cmpt-sidebar-menu-item  space-item"
      >
        <div>
          <Icon style={{ color: "#6a737d" }} />
          &nbsp;
          <span className="small cmpt-off-white">
            <b>{props.name.toUpperCase()}</b>
          </span>
        </div>
        <div>
          {subItems.length !== 0 && (
            <IoIosArrowDown
              style={{ color: "#6a737d" }}
              className={iconClass}
            />
          )}
        </div>
      </li>
      {subItems.map((dprop, dkey) => (
        <SubItems key={dkey} subLinkClass={subLinkClass} {...dprop} />
      ))}
    </div>
  );
}

export default SubMenu;
