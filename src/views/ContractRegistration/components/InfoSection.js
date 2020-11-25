import React from "react";
import { Input, Button, Form } from "antd";
import { Content, SpaceBetween, ButtonContainer } from "./styles";

function InfoSection(props) {
  // const { handleNext } = props;
  function handleNext() {
    props.nextStep();
  }
  return (
    <Content>
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
          <p>2nd January 2015</p>
        </SpaceBetween>
        <SpaceBetween>
          <p>End Date</p>
          <p>2nd January 2017</p>
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
