import { Button as AntButton } from "antd";
import styled, { css } from "styled-components";

const ButtonContainer = styled.div`
  ${(props) =>
    props.containerpadding &&
    css`
      padding: ${props.containerpadding};
    `};
  ${(props) =>
    props.containermargin &&
    css`
      margin: ${props.containermargin};
    `};

  ${(props) =>
    props.containerstyle &&
    css`
      {...${props.containerstyle}};
    `};
`;

function Button(props) {
  return (
    <ButtonContainer
      containermargin={props.containermargin}
      containerpadding={props.containerpadding}
      containerstyle={props.containerstyle}
    >
      <AntButton {...props}>{props.title}</AntButton>
    </ButtonContainer>
  );
}

export default Button;
