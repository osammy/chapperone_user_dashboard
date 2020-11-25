import styled, { css } from "styled-components";

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

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export { Button, SpaceBetween, Container };
