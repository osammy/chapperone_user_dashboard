import React from "react";
import { Spin } from "antd";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.overhead &&
    css`
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.1);
    `}

  ${(props) =>
    props.show &&
    css`
      display: flex;
    `}
`;

function Loading(props) {
  const { loaderText, show, overhead } = props;
  return (
    <Container show={show} overhead={overhead}>
      <Spin tip={loaderText ? loaderText : ""}></Spin>
    </Container>
  );
}

export default Loading;
