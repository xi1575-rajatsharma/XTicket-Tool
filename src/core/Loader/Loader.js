import React from "react";
import loader from "../../app/images/Loader.gif";
import * as styled from "./Loader.styled";

const Loader = (props) => {
  return (
    <styled.container>
      <img src={loader} alt="" height={props.height || "50px"} />
      <styled.loadingText>{props.loadingText || null}</styled.loadingText>
    </styled.container>
  );
};

export default Loader;
