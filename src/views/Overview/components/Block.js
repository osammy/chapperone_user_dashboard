import React from "react";
import CountUp from "react-countup";
import { Box, BoxInner } from "../styles";
import ImagIcon from "./ImageIcon";

function Block(props) {
  const { organisation, display } = props;
  let value = 0;
  if (display === "Trips") {
    value = organisation.noOfTrips ?? 0;
  } else if (display === "Teachers") {
    value = organisation.noOfStaff ?? 0;
  } else if (display === "Students") {
    value = organisation.noOfStudents ?? 0;
  }

  return (
    <Box>
      <BoxInner>
        {/* <div className="ovv-center-horiz">
          <img style={{ width: 50 }} src={Staff} />
        </div> */}
        <ImagIcon display={display} />
        <CountUp
          className="ovv-countup-span"
          suffix={` ${display}`}
          start={0}
          end={value}
          duration={5}
          redraw
        />
      </BoxInner>
    </Box>
  );
}

export default Block;
