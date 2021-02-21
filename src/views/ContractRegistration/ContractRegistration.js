import React, { useState, useEffect } from "react";
import StepWizard from "react-step-wizard";
import { useParams } from "react-router-dom";
import { Alert } from "antd";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { InfoSection, PaymentSection } from "./components";
import { Container } from "./styles";
import { requests, getUrl } from "../../globals/requests";
import { helpers } from "../../utils";
import logo from "../../assets/logos/icon_only_small-removebg.png";
import "./contractRegistration.css";

const key = "pk_test_QfwYWKP5W0f6T8uV7pNxriaG00TSUqqY2p";

function ContractRegistration(props) {
  const { contractId } = useParams();
  const [contract, setContract] = useState({});
  const [emailAssociated, setEmailAssociated] = useState("");
  const [errGettingContract, setErrorGettingContract] = useState(false);

  useEffect(() => {
    async function getContract() {
      try {
        setErrorGettingContract(false);

        const url = `${getUrl("contracts")}/${contractId}`;
        const response = await requests.get(url);
        setContract(response.data);
      } catch (e) {
        helpers.displayMessage(e);
        setErrorGettingContract(true);
      }
    }

    getContract();
  }, [contractId]);

  function handleInputChange(e) {
    setEmailAssociated(e.target.value);
  }

  return (
    <Container>
      <div>
        <div className="logo">
          <img alt="logo" src={logo} />
          <span>Chapperone</span>
        </div>

        <StepWizard>
          <InfoSection
            errGettingContract={errGettingContract}
            emailAssociated={emailAssociated}
            handleInputChange={handleInputChange}
            contract={contract}
          />
          <Elements stripe={loadStripe(key)}>
            <PaymentSection
              errGettingContract={errGettingContract}
              adminEmail={emailAssociated}
              contract={contract}
              // handleSubmit={activateContract}
            />
          </Elements>
        </StepWizard>
      </div>
    </Container>
  );
}

export default ContractRegistration;
