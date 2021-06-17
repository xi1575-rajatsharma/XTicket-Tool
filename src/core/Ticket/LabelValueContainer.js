import React from "react";
import { returnBlankIfEmpty } from "../../utils/Constants";
import * as styled from "./Ticket.styled";

const LabelValueContainer = (props) => {
  return (
    <styled.labelValueContainer styles={props.styles}>
      <styled.label>{props.label}</styled.label>
      <styled.value>{returnBlankIfEmpty(props.value)}</styled.value>
    </styled.labelValueContainer>
  );
};

export default LabelValueContainer;
