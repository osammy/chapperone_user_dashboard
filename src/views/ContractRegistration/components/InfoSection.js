import React, { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";

import { Content, SpaceBetween, ButtonContainer } from "./styles";
import { dateUtil, helpers } from "../../../utils";

function InfoSection(props) {
  const { contract } = props;
  function handleNext() {
    props.nextStep();
  }
  console.log(contract);

  return (
    <Content>
      <p>{contract.organisation?.name}</p>
      <Form
        layout="vertical"
        initialValues={{
          layout: "vertical",
        }}
      >
        <SpaceBetween>
          <Form.Item
            label="Contact Email"
            name="Contact Email"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input placeholder="Contact Email" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input placeholder="Address" />
          </Form.Item>
        </SpaceBetween>
        <SpaceBetween>
          <p>Start Date</p>
          <p>{dateUtil.formatDate(contract.startDate)}</p>
        </SpaceBetween>
        <SpaceBetween>
          <p>End Date</p>
          <p>{dateUtil.formatDate(contract.endDate)}</p>
        </SpaceBetween>
        <SpaceBetween>
          <p>Amount</p>
          <p>{helpers.toCurrency(contract.amount, contract.currency)}</p>
        </SpaceBetween>
      </Form>
      <ButtonContainer>
        <Button
          style={{ padding: "0 30px" }}
          onClick={handleNext}
          type="primary"
          htmlType="submit"
        >
          Next
        </Button>
      </ButtonContainer>
    </Content>
  );
}

export default InfoSection;
