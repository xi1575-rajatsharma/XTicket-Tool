import React from "react";
import Ticket from "core/Ticket/Ticket";
import Loader from "core/Loader/Loader";
import * as styled from "../EmployeeDashboard.styled";

const EmployeeDashboardTicketsContainer = (props) => {
  return (
    <styled.ticketContainer>
      {props.dashboardState && props.dashboardState.loading ? (
        <styled.loaderContainer>
          <Loader />
        </styled.loaderContainer>
      ) : props.dashboardState && props.dashboardState.error ? (
        <div className="card text-center">
          <div className="card-body">
            <blockquote className="blockquote mb-0 text-danger">
              {props.dashboardState.errorMessage}
            </blockquote>
          </div>
        </div>
      ) : props.dashboardState &&
        props.dashboardState.tickets &&
        props.dashboardState.tickets.length ? (
        props.dashboardState.tickets.map((ticket) => (
          <>
            <Ticket
              allAdminData={props.allUsers}
              data={ticket}
              key={ticket.id}
              mapChangesToState={props.mapChangesToState}
              handleTicketClick={props.handleTicketClick}
            />
          </>
        ))
      ) : (
        <styled.noRecordsContainer>
          <styled.noRecordsText className="card-title">
            No Tickets Found
          </styled.noRecordsText>
        </styled.noRecordsContainer>
      )}
    </styled.ticketContainer>
  );
};

export default EmployeeDashboardTicketsContainer;
