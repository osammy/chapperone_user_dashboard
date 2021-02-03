import styled, { css } from "styled-components";
import { device } from "../../constants";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;
const Container = styled.div`
  background-color: var(--illustration);
  padding: var(---verticalMargin);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoxContainer = styled.div`
  padding: var(---space);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 250px;
`;

const Box = styled.div`
  background-color: var(--white);
  padding: var(---space);
  height: 170px;
  width: 250px;

  @media ${device.mobileL} {
    max-width: 300px;
  }
`;

const BoxInner = styled.div`
  padding: var(---space);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 430px;
  max-height: 100%;
  background-color: var(--white);
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

export {
  Button,
  SpaceBetween,
  Container,
  BoxContainer,
  Box,
  BoxInner,
  ChartContainer,
  Dot,
};
