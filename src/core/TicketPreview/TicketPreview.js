import React, { useEffect } from "react";
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

  return (
    <styled.container {...styled.motionProps}>
      <styled.header>
        <styled.nameAndInitalsContainer>
          <styled.initialsContainer>
            <Initials
              fullName={props.data.name}
              size={"28px"}
              fontSize={"1.3rem"}
            />
          </styled.initialsContainer>
          <styled.nameContainer> {props.data.name}</styled.nameContainer>
        </styled.nameAndInitalsContainer>
        <styled.daysContainer>
          Due in {getDayDifference()} days
        </styled.daysContainer>
      </styled.header>
    </styled.container>
  );
};

export default TicketPreview;
