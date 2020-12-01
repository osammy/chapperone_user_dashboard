import styled from "styled-components";

const Container = styled.div`
  background-color: var(--white);
  padding: var(---verticalMargin);
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 650px; */
  /* height: 450px; */
  padding: var(--verticalMargin);
  position: relative;
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* width: 800px;
  height: 500px; */
`;

const FlexEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  /* width: 800px;
  height: 500px; */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 150px;
`;

const SwitchContainer = styled.div`
  margin: 20px 0;
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const CardHeader = styled.div`
  font-size: 20px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const TableButtonsContainer = styled.div`
  height: 35px;
`;

export {
  Container,
  SpaceBetween,
  ButtonContainer,
  SwitchContainer,
  CardHeader,
  FlexEnd,
  TableContainer,
  TableButtonsContainer,
};
