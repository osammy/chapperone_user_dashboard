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
  /* background-color: var(--white); */
  padding: var(---verticalMargin);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
`;

const MainContent = styled.div`
  background-color: var(--white);
  padding: var(---verticalMargin);
  height: 300px;
  width: 100%;
  padding: var(--space);
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: var(--space) 0 0 0;
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div`
  /* height: 500px; */
  width: 100%;
`;

export { Button, SpaceBetween, Container, Content, MainContent, Center };
