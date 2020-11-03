import React from 'react'
import DMFormatter from '../../Components/UI/DMFormatter';

const TicketBasicDetails = ({ ticket, ticketApprovers }) => (
  <>
    {console.log(ticket)}
    <h3>{ticket.displayName}</h3>
    <div className="email-wrapper">
      <span>{ticket.emailId}</span>
    </div>
    <div className="mobile-wrapper">
      <span>91 9041342333</span>
    </div>

    <div className="ticketDetails-border"></div>

    <div className="ticketDetails-info">
      <div className="ticketDetails-info-heading">
        <h4>Ticket Information</h4>
      </div>
      <div className="ticketDetails-info-items">
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Assigned to</p>
          <p className="ticketDetails-info-item-value">{ticket.assignedTo}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Status</p>
          <p className="ticketDetails-info-item-value">{ticket.status}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">SLA</p>
          <p className="ticketDetails-info-item-value"><DMFormatter timestamp={ticket.dueOn} /></p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Location</p>
          <p className="ticketDetails-info-item-value">{ticket.location}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Department</p>
          <p className="ticketDetails-info-item-value">{ticket.department}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Sub Issue</p>
          <p className="ticketDetails-info-item-value">{ticket.subIssue}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Sub Category</p>
          <p className="ticketDetails-info-item-value">{ticket.subCategory}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Classifications</p>
          <p className="ticketDetails-info-item-value">{ticket.classification}</p>
        </div>
        <div className="ticketDetails-info-item">
          <p className="ticketDetails-info-item-heading">Approvers</p>
          {ticketApprovers.slice(1).map(approver => <p className="ticketDetails-info-item-value">{approver.email}</p>)}

        </div>
      </div>
    </div>
  </>
)

export default TicketBasicDetails