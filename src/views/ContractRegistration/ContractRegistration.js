import React, { useState } from "react";
import StepWizard from "react-step-wizard";

import { InfoSection, PaymentSection } from "./components";
import { Container } from "./styles";
import logo from "../../assets/logos/icon_only_small-removebg.png";

import "./contractRegistration.css";

function ContractRegistration(props) {
  return (
    <Container>
      <div>
        <div className="logo">
          <img alt="logo" src={logo} />
          <span>Chapperone</span>
        </div>

        <StepWizard>
          <InfoSection />
          <PaymentSection />
        </StepWizard>
      </div>
    </Container>
  );
}

export default ContractRegistration;
