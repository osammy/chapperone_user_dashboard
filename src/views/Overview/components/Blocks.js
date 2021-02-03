import React, { useState, useEffect } from "react";
import Block from "./Block";

import { BoxContainer } from "../styles";
import { userUtil } from "../../../utils";

function Blocks(props) {
  // const [organisation, setOrganisation] = useState({});
  const organisation = userUtil.getOrganisation();
  // useEffect(() => {
  //   const organisation = userUtil.getOrganisation();
  //   setOrganisation(organisation);
  // }, []);

  return (
    <BoxContainer>
      <Block organisation={organisation} display="Trips" />
      <Block organisation={organisation} display="Teachers" />
      <Block organisation={organisation} display="Students" />
    </BoxContainer>
  );
}

export default Blocks;
