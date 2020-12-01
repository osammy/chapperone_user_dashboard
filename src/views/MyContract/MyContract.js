import React from "react";
import { Divider } from "antd";

import {
  Container,
  Content,
  SpaceBetween,
  MainContent,
  Center,
} from "./styles";
import { userUtil, dateUtil, helpers } from "../../utils";
import { Button } from "../../components";

function MyContract(props) {
  const contract = userUtil.getLatestContract();

  function getDaysLeft() {
    let daysLeftText = "";
    const daysLeft = dateUtil.differenceInDays(
      new Date(contract.endDate),
      new Date()
    );
    daysLeftText = `${daysLeft} Days`;
    if (daysLeft < 0) {
      daysLeftText = "Expired";
    }

    return daysLeftText;
  }
  return (
    <Container>
      <Content>
        <Divider orientation="center">My Contract</Divider>
        <MainContent>
          <SpaceBetween>
            <p>Started On</p>
            <p>{dateUtil.formatDate(contract.startDate)}</p>
          </SpaceBetween>
          <SpaceBetween>
            <p>Expires On</p>
            <p>{dateUtil.formatDate(contract.endDate)}</p>
          </SpaceBetween>
          <SpaceBetween>
            <p>Amount</p>
            <p>{helpers.toCurrency(contract.amount, contract.currency)}</p>
          </SpaceBetween>
          <SpaceBetween>
            <p>Description</p>
            <p>{contract.description}</p>
          </SpaceBetween>

          <SpaceBetween>
            <p>Days Left</p>
            <p>{getDaysLeft()}</p>
          </SpaceBetween>
          <SpaceBetween>
            <p>Teacher Limit</p>
            <p>10</p>
          </SpaceBetween>
          <Center>
            <Button title="Renew Contract" type="primary" />
          </Center>
        </MainContent>
      </Content>
    </Container>
  );
}

export default MyContract;
