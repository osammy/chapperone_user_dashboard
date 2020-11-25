import React, { useState, useEffect } from "react";
import { Button, Switch } from "antd";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

import { Content, SwitchContainer, SpaceBetween, CardHeader } from "./styles";
import { requests, getUrl } from "../../../globals/requests";
import "../CardSectionStyles.css";

const key = "pk_test_QfwYWKP5W0f6T8uV7pNxriaG00TSUqqY2p";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function PaymentSection() {
  const [payViaCheck, setPayViaCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const { orgId } = useParams();

  useEffect(() => {
    alert(orgId);
  }, []);

  function handlePayment() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function onChange(checked) {
    setPayViaCheck(checked);
  }

  return (
    <Content>
      <SwitchContainer>
        <p>Pay Via Check</p>
        <Switch onChange={onChange} />
      </SwitchContainer>

      {payViaCheck ? (
        <p>
          Mail the check addressed to lorem ipsum dolor ichtecj semen toliso
          paremi lorem ipsum dolor.
        </p>
      ) : (
        <>
          <CardHeader>Enter Card Details</CardHeader>
          <SpaceBetween>
            <Elements stripe={loadStripe(key)}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Elements>
            <Button loading={loading} type="primary" onClick={handlePayment}>
              Submit Payment
            </Button>
          </SpaceBetween>
        </>
      )}
    </Content>
  );
}

export default PaymentSection;
