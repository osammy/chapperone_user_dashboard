import React from "react";
import StaffIcon from "../../../assets/images/resized/employee.png";
import TripIcon from "../../../assets/images/resized/destination.png";
import StudentIcon from "../../../assets/images/resized/students.png";

function ImagIcon(props) {
  const { display } = props;
  let Icon;
  switch (display) {
    case "Trips":
      Icon = TripIcon;
      break;
    case "Staffs":
      Icon = StaffIcon;
      break;
    case "Students":
      Icon = StudentIcon;
      break;
    default:
      Icon = StaffIcon;
  }
  return (
    <div className="ovv-imageIcons-container">
      <img
        className="ovv-imageIcon"
        width="50"
        height="50"
        src={Icon}
        alt="Top Statistics Logo"
      />
    </div>
  );
}

export default ImagIcon;
