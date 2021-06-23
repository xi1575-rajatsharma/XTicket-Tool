import React, { useEffect } from "react";
import Close from "app/images/Close.svg";
import { getDifferenceInDays } from "utils/Constants";
import Initials from "core/Initals/Initials";

import * as styled from "./TicketPreview.styled";

const TicketPreview = (props) => {
  const getDayDifference = () => {
    return getDifferenceInDays(
      props.data.responseDueOn,
      props.data.creationTime
    );
  };
  const status = props.data.status;
  const intialsProps = {
    fullName: props.data.name,
    size: "28px",
    fontSize: "1.3rem",
  };

  return (
    <styled.container {...styled.motionProps}>
      <styled.header>
        <styled.nameAndInitalsContainer>
          <styled.initialsContainer>
            <Initials {...intialsProps} />
          </styled.initialsContainer>
          <styled.nameContainer> {props.data.name}</styled.nameContainer>
        </styled.nameAndInitalsContainer>
        {status !== "RESOLVED" && status !== "CLOSED" ? (
          <styled.daysContainer>
            Due in {getDayDifference()} days
          </styled.daysContainer>
        ) : (
          <styled.daysContainer>{status}</styled.daysContainer>
        )}
        <styled.closeBtn onClick={props.closePreview}>
          <img src={Close} />
        </styled.closeBtn>
      </styled.header>
    </styled.container>
  );
};

export default TicketPreview;
