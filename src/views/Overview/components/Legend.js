import React from "react";
import { Dot } from "../styles";

function Legend() {
  return (
    <div className="ovv-chart-legend">
      <div className="ovv-dots-container">
        <div className="ovv-dots-content">
          <div className="ovv-center-item">
            <Dot color="rgb(215, 154, 233)" />
          </div>
          <div className="ovv-center-item">
            <div className="ovv-legend-text">Trips</div>
          </div>
        </div>
        {/* <div className="ovv-dots-content">
          <div className="ovv-center-item">
            <Dot color="rgb(106, 233, 148)" />
          </div>
          <div className="ovv-center-item">
            <div className="ovv-legend-text">Users</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Legend;
