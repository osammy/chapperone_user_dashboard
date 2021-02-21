import React, { useEffect, useState } from "react";
import { Input, Button, Form, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { Content, SpaceBetween, ButtonContainer } from "./styles";
import { dateUtil, helpers } from "../../../utils";
import { getUrl, requests } from "../../../globals/requests";

function InfoSection(props) {
  const {
    contract,
    handleInputChange,
    emailAssociated,
    errGettingContract,
  } = props;
  const [loadingNextBtn, setLoadingNextBtn] = useState(false);
  const [showErrAlert, setShowErrorAlert] = useState(false);

  async function setAsOrgAdmin() {
    try {
      const organisationId = contract?.organisation?._id;
      console.log(organisationId);
      // :id/addAdminBySuperAdmin/contactEmail/:contactEmail
      const url = `${getUrl(
        "organisations"
      )}/${organisationId}/addAdminBySuperAdmin/contactEmail/${emailAssociated}`;
      console.log(url);
      setLoadingNextBtn(true);
      await requests.put(url);
      setLoadingNextBtn(false);
    } catch (e) {
      setLoadingNextBtn(false);
      alert(e.message);
    }
  }

  async function handleNext() {
    try {
      if (emailAssociated === "") {
        alert("An associated admin email must be provided");
        return;
      }
      //await setAsOrgAdmin();
      props.nextStep();
    } catch (e) {
      alert(e.message);
    }
  }

  const onClose = (e) => {
    console.log(e, "I was closed.");
  };

  return (
    <Content>
      <p>{contract.organisation?.name}</p>
      {errGettingContract && (
        <Alert
          message="Could not get contract"
          description="An error occured, while gettign contract. Kindly refresh the page or contact admin."
          type="error"
          closable
          onClose={onClose}
        />
      )}
      <Form
        layout="vertical"
        initialValues={{
          layout: "vertical",
        }}
        style={{ marginTop: "10px" }}
      >
        <SpaceBetween>
          <Form.Item
            label="Associated Email"
            name="Contact Email"
            rules={[{ required: true }]}
            tooltip={{
              title:
                "Provide an associated email, address of a user who already is an admin or who would be set as an admin. Email address must already be associated to a valid gochapperone account.",
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input
              onChange={handleInputChange}
              placeholder="Email Associated with account"
              value={emailAssociated}
            />
          </Form.Item>
          {/* <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input placeholder="Address" />
          </Form.Item> */}
        </SpaceBetween>
        <SpaceBetween>
          <p>Start Date</p>
          <p>{dateUtil.formatDate(contract.startDate)}</p>
        </SpaceBetween>
        <SpaceBetween>
          <p>End Date</p>
          <p>{dateUtil.formatDate(contract.endDate)}</p>
        </SpaceBetween>
        {contract.amount && (
          <SpaceBetween>
            <p>Amount</p>
            <p>{helpers.toCurrency(contract.amount, contract.currency)}</p>
          </SpaceBetween>
        )}
      </Form>
      <ButtonContainer>
        <Button
          style={{ padding: "0 30px" }}
          onClick={handleNext}
          type="primary"
          htmlType="submit"
          disabled={true}
          loading={loadingNextBtn}
        >
          Next
        </Button>
      </ButtonContainer>
    </Content>
  );
}

export default InfoSection;
