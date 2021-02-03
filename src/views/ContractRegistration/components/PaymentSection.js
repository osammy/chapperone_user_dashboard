import React, { useState, useEffect } from "react";
import { Button, Switch, Modal } from "antd";
import CreditCardInput from "react-credit-card-input";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

import { Content, SwitchContainer, SpaceBetween, CardHeader } from "./styles";
import { requests, getUrl } from "../../../globals/requests";
import "../CardSectionStyles.css";
import { helpers } from "../../../utils";

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

const cardNumber = "";
const expiry = "";
const cvc = "";

function PaymentSection(props) {
  const [payViaCheck, setPayViaCheck] = useState(false);
  const [loadingSubmitBtn, setLoadingSubmitBtn] = useState(false);

  const { contract } = props;

  function onChange(checked) {
    setPayViaCheck(checked);
  }

  const stripe = useStripe();
  const elements = useElements();

  function paymentSuccess() {
    Modal.success({
      content: "Your payment was succesful...",
    });
  }

  function showError(message) {
    Modal.success({
      content: message || "Unknown error occured",
    });
  }

  async function activateContract() {
    try {
      setLoadingSubmitBtn(true);
      const card = elements.getElement(CardElement);

      const result = await stripe.createToken(card);
      console.log(result);

      if (result.error) {
        // Inform the user if there was an error.
        console.log(result.error.message);
        showError(result.error.message);
        return;
      }
      const { id, brand, exp_month, exp_year, last4 } = result.token.card;
      const cardDetails = {
        id,
        brand,
        exp_month,
        exp_year,
        last4,
        tokenId: result.token.id,
      };
      // Send the token to your server.
      // stripeTokenHandler(result.token);

      const url = `${getUrl("contracts")}/${contract._id}/active`;
      const response = await requests.put(url, cardDetails);
      console.log(response.data);
      setLoadingSubmitBtn(false);
      //   setContract(response.data);
      paymentSuccess();
    } catch (e) {
      console.log(e);
      setLoadingSubmitBtn(false);
      helpers.displayMessage(e);
    }
  }

  return (
    <Content>
      <SwitchContainer>
        <p>Pay Via Check</p>
        <Switch onChange={onChange} />
      </SwitchContainer>

      {payViaCheck ? (
        <p>
          Mail the check addressed to Lorem Ipsum Dolor Ichtecj Semen toliso
          paremi lorem ipsum dolor.
        </p>
      ) : (
        <>
          <CardHeader>Enter Card Details</CardHeader>
          <CardHeader>
            {contract.amount &&
              "Amount: " +
                helpers.toCurrency(contract.amount, contract.currency)}
          </CardHeader>
          {contract.amount && (
            <>
              <SpaceBetween>
                <CardElement options={CARD_ELEMENT_OPTIONS} />

                <Button
                  loading={loadingSubmitBtn}
                  type="primary"
                  onClick={activateContract}
                >
                  Pay {helpers.toCurrency(contract.amount, contract.currency)}
                </Button>
              </SpaceBetween>
              {/* <CreditCardInput
                cardNumberInputProps={{
                  value: cardNumber,
                  onChange: () => null,
                }}
                cardExpiryInputProps={{ value: expiry, onChange: () => null }}
                cardCVCInputProps={{ value: cvc, onChange: () => null }}
                fieldClassName="input"
              /> */}
            </>
          )}
        </>
      )}
    </Content>
  );
}

export default PaymentSection;
