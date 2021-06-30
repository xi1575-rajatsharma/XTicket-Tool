import ManageAccess from "core/ManageAccess/ManageAccess";
import React from "react";
import TicketListingByStatusPage from "../TicketListingByStatusPage/TicketListingByStatusPage";
import * as styled from "./TicketListingPage.styled";
const TicketListingComponents = (props) => {
  return (
    <styled.ticketListingComponent>
      {props.selectedKey === "OPEN" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "ASSIGNED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "INPROGRESS" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "AWAITING" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "REVIEW" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "ESCALATED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "CLOSED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "REOPENED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "RESOLVED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "AWAITINGVENDOR" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "AWAITINGUSER" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} />
      ) : null}
      {props.selectedKey === "manageAccess" ? (
        <ManageAccess selectedKey={props.selectedKey} />
      ) : null}
    </styled.ticketListingComponent>
  );
};

export default TicketListingComponents;
