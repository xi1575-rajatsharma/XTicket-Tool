import React from "react";
import Initials from "core/Initals/Initials";
import Close from "app/images/Close.svg";
import * as styled from "./TicketPreview.styled";
import { returnBlankIfEmpty } from "utils/Constants";

const TicketPreviewHeader = (props) => {
  const intialsProps = {
    fullName: props.name,
    size: "28px",
    fontSize: "1.3rem",
  };
  const dayDifference = props.getDayDifference();
  return (
    <styled.header>
      <styled.nameAndInitalsContainer>
        <styled.initialsContainer>
          <Initials {...intialsProps} />
        </styled.initialsContainer>
        <styled.nameContainer>
          {returnBlankIfEmpty(props.name)}
        </styled.nameContainer>
      </styled.nameAndInitalsContainer>
      {props.status !== "RESOLVED" && props.status !== "CLOSED" ? (
        <styled.daysContainer>
          Due {dayDifference > 0 ? "in" : null}{" "}
          {(dayDifference > 0 && dayDifference) || "Today"}&nbsp;
          {dayDifference > 0 ? (dayDifference !== 1 ? "days" : "day") : null}
        </styled.daysContainer>
      ) : (
        <styled.daysContainer>{props.status}</styled.daysContainer>
      )}
      <styled.closeBtn onClick={props.closePreview}>
        <img src={Close} alt="Close" />
      </styled.closeBtn>
    </styled.header>
  );
};

export default TicketPreviewHeader;
