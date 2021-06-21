import React from "react";
import * as styled from "./ComponentError.styled";

const ComponentError = (props) => {
  return (
    <styled.errorContainer errorContainerStyles={props.errorContainerStyles}>
      <styled.errorText paragraphStyles={props.paragraphStyles}>
        {props.errorText || "Error Occured!"}
      </styled.errorText>
    </styled.errorContainer>
  );
};

export default ComponentError;
